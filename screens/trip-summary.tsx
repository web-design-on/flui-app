import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { BackIcon } from "../components/icons";
import { colors } from "../lib/theme/colors";
import { HistoryItem, Station } from "../lib/types";
import { formatDuration, unsplashUrl } from "../lib/utils";

interface TripSummaryScreenProps {
  item: HistoryItem;
  station: Station;
  onBack: () => void;
  onSelectStation: (stationId: string) => void;
}

const addMinutes = (time: string, min: number) => {
  const [h, m] = time.split(":").map(Number);
  const total = (h * 60 + m + min) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

export default function TripSummaryScreen({
  item,
  station,
  onBack,
  onSelectStation,
}: TripSummaryScreenProps) {
  const { trip } = item;

  const stats = [
    {
      label: "Distância",
      value: `${trip.distanceKm} km`,
      icon: <Ionicons name="navigate" size={20} color={colors.brand.primary} />,
    },
    {
      label: "Energia",
      value: `${item.energyKwh} kWh`,
      icon: (
        <MaterialIcons name="battery-charging-full" size={22} color={colors.brand.primary} />
      ),
    },
    {
      label: "Recarga",
      value: formatDuration(item.duration),
      icon: <Ionicons name="time" size={20} color={colors.brand.primary} />,
    },
  ];

  const details = [
    { label: "Veículo", value: item.vehicle },
    { label: "Chegada ao ponto", value: trip.arrivalTime },
    { label: "Saída do ponto", value: addMinutes(trip.arrivalTime, item.duration) },
    { label: "Potência utilizada", value: `${item.power} kW` },
    { label: "Bateria ao chegar", value: `${trip.batteryStart}%` },
    { label: "Bateria ao sair", value: `${trip.batteryEnd}%` },
    { label: "Valor pago", value: brl(trip.cost) },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon color={colors.neutral.textSecondary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Resumo da viagem</Text>
          <Text style={styles.hint}>
            {item.date} · {trip.arrivalTime}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.duration(320)} style={styles.photoCard}>
          <Image
            source={
              station.image ?? { uri: unsplashUrl(station.unsplashId, 800, 400) }
            }
            style={styles.image}
          />
          <View style={styles.photoBody}>
            <View style={{ flex: 1 }}>
              <Text style={styles.stationName}>{item.stationName}</Text>
              <Text style={styles.hint}>
                Ponto de recarga · {station.neighborhood}
              </Text>
              <View style={styles.ratingLine}>
                <Text style={styles.stars}>
                  {"★".repeat(Math.floor(station.rating))}
                </Text>
                <Text style={styles.ratingBold}>{station.rating}</Text>
                <Text style={styles.reviewCount}>
                  · {station.reviewCount} avaliações
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(50).duration(320)} style={styles.card}>
          <View style={styles.statsRow}>
            {stats.map(({ label, value, icon }) => (
              <View key={label} style={styles.stat}>
                {icon}
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(320)} style={styles.card}>
          <Text style={styles.cardTitle}>Trajeto</Text>
          <View style={styles.timeline}>
            <View style={styles.track}>
              <View style={styles.dotStart} />
              <View style={styles.line} />
              <View style={styles.dotStop} />
              <View style={styles.line} />
              <View style={styles.dotEnd} />
            </View>
            <View style={styles.labels}>
              <View>
                <Text style={styles.place}>{trip.origin}</Text>
                <Text style={styles.hint}>Origem</Text>
              </View>
              <TouchableOpacity onPress={() => onSelectStation(item.stationId)}>
                <Text style={styles.place}>{item.stationName}</Text>
                <Text style={styles.hint}>
                  Parada para recarga · {station.neighborhood}
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.place}>{trip.destination}</Text>
                <Text style={styles.hint}>Destino</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(320)} style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da recarga</Text>
          {details.map(({ label, value }) => (
            <View key={label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  backButton: { padding: 4 },
  title: { fontSize: 20, fontWeight: "700", color: colors.neutral.text },
  hint: { fontSize: 12, color: colors.neutral.textSubtle, marginTop: 2 },
  content: { padding: 20, gap: 16 },
  card: { backgroundColor: colors.neutral.white, borderRadius: 16, padding: 16 },
  photoCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: 160 },
  photoBody: { flexDirection: "row", alignItems: "center", padding: 16 },
  stationName: { fontSize: 18, fontWeight: "700", color: colors.neutral.text },
  ratingLine: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  stars: { color: colors.semantic.rating, fontSize: 13 },
  ratingBold: { fontSize: 14, fontWeight: "600", color: colors.neutral.textSecondary },
  reviewCount: { fontSize: 12, color: colors.neutral.placeholder },
  cardTitle: { fontSize: 14, fontWeight: "700", color: colors.neutral.text, marginBottom: 12 },
  statsRow: { flexDirection: "row", gap: 12 },
  stat: {
    flex: 1,
    backgroundColor: colors.brand.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statValue: { fontSize: 14, fontWeight: "700", color: colors.neutral.text, marginTop: 2 },
  statLabel: { fontSize: 10, color: colors.neutral.textSubtle },
  timeline: { flexDirection: "row", gap: 12 },
  track: { alignItems: "center", paddingVertical: 6 },
  line: { flex: 1, width: 2, backgroundColor: colors.brand.border, marginVertical: 2 },
  dotStart: { width: 12, height: 12, borderRadius: 6, borderWidth: 3, borderColor: colors.brand.primary },
  dotStop: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.brand.primary },
  dotEnd: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.semantic.success },
  labels: { flex: 1, gap: 24 },
  place: { fontSize: 14, fontWeight: "600", color: colors.neutral.text },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.borderLight,
  },
  detailLabel: { fontSize: 13, color: colors.neutral.textSubtle },
  detailValue: { fontSize: 13, fontWeight: "600", color: colors.neutral.text },
});
