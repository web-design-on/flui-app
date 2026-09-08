import { FilterIcon, LocateIcon, SearchIcon } from "@/components/icons";
import StationFilterModal, {
    EMPTY_FILTERS,
    StationFilters,
} from "@/components/station-filter-modal";
import StationMapMarker from "@/components/station-map-marker";
import StationPreviewCard from "@/components/station-preview.card";
import { stations } from "@/lib/data";
import { colors } from "@/lib/theme/colors";
import { Station } from "@/lib/types";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_REGION: Region = {
  latitude: -23.5613,
  longitude: -46.6558,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

function isOpen24Hours(hours?: string) {
  const normalizedHours = hours?.trim().toLowerCase();
  return (
    normalizedHours === "24" ||
    normalizedHours === "24h" ||
    normalizedHours === "24 horas"
  );
}

function isOpenNow(hours?: string, now = new Date()) {
  if (!hours) return false;
  if (isOpen24Hours(hours)) return true;

  const hoursMatch = hours.match(
    /^(\d{1,2})h(?:([0-5]\d))?\s+às\s+(\d{1,2})h(?:([0-5]\d))?$/i,
  );
  if (!hoursMatch) return false;

  const [, startHour, startMinute, endHour, endMinute] = hoursMatch;
  const start = Number(startHour) * 60 + Number(startMinute ?? 0);
  const end = Number(endHour) * 60 + Number(endMinute ?? 0);
  const current = now.getHours() * 60 + now.getMinutes();

  if (end > start) return current >= start && current <= end;
  return current >= start || current <= end;
}

function stationMatchesFilters(station: Station, filters: StationFilters) {
  if (filters.connectors.length > 0) {
    const hasConnector = station.connectors.some((c) =>
      filters.connectors.includes(c.type),
    );
    if (!hasConnector) return false;
  }

  if (filters.minPower !== null && station.maxPower < filters.minPower) {
    return false;
  }

  if (filters.amenities.length > 0) {
    const hasAllAmenities = filters.amenities.every((a) =>
      station.amenities.includes(a),
    );
    if (!hasAllAmenities) return false;
  }

  for (const intent of filters.intents) {
    if (intent === "Carregar rápido" && station.maxPower < 100) return false;
    if (intent === "Baixo movimento" && station.movement !== "low")
      return false;
    if (
      intent === "Seguro à noite" &&
      !station.amenities.includes("Segurança 24h")
    )
      return false;
    if (
      intent === "Confortável para esperar" &&
      !station.amenities.some((a) => ["Café", "Restaurante"].includes(a))
    )
      return false;

    if (intent === "Aberto 24h" && !isOpen24Hours(station.hours)) {
      return false;
    }

    if (intent === "Aberto agora" && !isOpenNow(station.hours)) {
      return false;
    }
  }

  return true;
}

export default function MapScreen() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<StationFilters>(EMPTY_FILTERS);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [mapInstanceKey, setMapInstanceKey] = useState(0);
  const mapRef = React.useRef<MapView>(null);

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      if (
        search.trim() &&
        !s.name.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }
      return stationMatchesFilters(s, filters);
    });
  }, [search, filters]);

  const selectedStation =
    filteredStations.find((s) => s.id === selectedStationId) || null;
  const activeFilterCount =
    filters.intents.length +
    filters.connectors.length +
    filters.amenities.length +
    (filters.minPower ? 1 : 0);

  const handleLocate = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const position = await Location.getCurrentPositionAsync({});
      const next: Region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
      setRegion(next);
      mapRef.current?.animateToRegion(next, 500);
    } catch {
      // Sem permissão/localização indisponível — mantém a região atual.
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearch("");
      setFilters(EMPTY_FILTERS);
      setSelectedStationId(null);
      setRegion(DEFAULT_REGION);
      setMapInstanceKey((key) => key + 1);
    }, []),
  );

  return (
    <View style={styles.screen}>
      <MapView
        key={mapInstanceKey}
        ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={StyleSheet.absoluteFill}
        initialRegion={DEFAULT_REGION}
        onRegionChangeComplete={setRegion}
        onPress={() => setSelectedStationId(null)}
      >
        {filteredStations
          .filter((s) => s.latitude != null && s.longitude != null)
          .map((s) => (
            <Marker
              key={s.id}
              coordinate={{ latitude: s.latitude!, longitude: s.longitude! }}
              tracksViewChanges
              onPress={(e) => {
                e.stopPropagation();
                Keyboard.dismiss();
                setSelectedStationId(s.id);
              }}
              anchor={{ x: 0.5, y: 1 }}
            >
              <StationMapMarker
                station={s}
                selected={s.id === selectedStationId}
              />
            </Marker>
          ))}
      </MapView>

      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        <View style={styles.topRow}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar nesta área…"
              placeholderTextColor={colors.neutral.placeholder}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(true)}
            style={styles.filterButton}
          >
            <FilterIcon />
            <Text style={styles.filterButtonText}>Filtros</Text>
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.legend} pointerEvents="none">
        <View style={styles.legendRow}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: colors.semantic.success },
            ]}
          />
          <Text style={styles.legendText}>Disponível</Text>
        </View>
        <View style={styles.legendRow}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: colors.semantic.warning },
            ]}
          />
          <Text style={styles.legendText}>Ocupada</Text>
        </View>
        <View style={styles.legendRow}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: colors.semantic.error },
            ]}
          />
          <Text style={styles.legendText}>Indisponível</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleLocate} style={styles.locateButton}>
        <LocateIcon />
      </TouchableOpacity>

      {selectedStation && (
        <Animated.View
          entering={FadeInDown.duration(350)}
          exiting={FadeOutDown.duration(220)}
          style={styles.previewWrapper}
        >
          <StationPreviewCard
            station={selectedStation}
            onViewDetails={() => router.push(`./station/${selectedStation.id}`)}
          />
        </Animated.View>
      )}

      <StationFilterModal
        visible={filterModalVisible}
        initialFilters={filters}
        onClose={() => setFilterModalVisible(false)}
        onApply={setFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surfaceMuted },
  topOverlay: { position: "absolute", top: 0, left: 0, right: 0 },
  topRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  searchInput: { flex: 1, fontSize: 13, color: colors.neutral.text },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brand.primary,
  },
  filterBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.neutral.white,
  },
  legend: {
    position: "absolute",
    left: 16,
    bottom: 24,
    backgroundColor: colors.overlay.white95,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: {
    fontSize: 11,
    color: colors.neutral.textMuted,
    fontWeight: "500",
  },
  locateButton: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  previewWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
