import { HeartIcon } from "@/components/icons";
import PrimaryButton from "@/components/primary-button";
import StationCard from "@/components/station-card";
import { stations } from "@/lib/data";
import { useFavorites } from "@/lib/favorites-context";
import { colors } from "@/lib/theme/colors";
import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const favStations = stations.filter((s) => favorites.has(s.id));

  if (favStations.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Ainda não há favoritos</Text>
          <Text style={styles.emptyDescription}>
            Salve seus pontos preferidos para encontrá-los rapidamente
          </Text>
          <PrimaryButton
            label="Explorar pontos"
            onPress={() => router.push("/(tabs)/map")}
            style={styles.exploreButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favStations.map((s) => (
          <StationCard
            key={s.id}
            station={s}
            size="small"
            showScore={false}
            onPress={() => router.push(`/station/${s.id}`)}
            rightAccessory={
              <TouchableOpacity
                onPress={() => toggleFavorite(s.id)}
                style={styles.removeButton}
                activeOpacity={0.7}
              >
                <HeartIcon filled />
              </TouchableOpacity>
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.neutral.surface,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontWeight: "700",
    color: colors.neutral.text,
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 13,
    color: colors.neutral.textSubtle,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 12,
    backgroundColor: colors.brand.pale,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    padding: 18,
  },
  exploreButton: {
    paddingHorizontal: 16,
    width: "100%",
  },
});
