import { colors } from "@/lib/theme/colors";
import { Station } from "@/lib/types";
import { getScoreGradient, getStatusColor } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./primary-button";

interface Props {
  station: Station;
  onViewDetails: () => void;
}

export default function StationPreviewCard({ station, onViewDetails }: Props) {
  const statusColor = getStatusColor(station.status);

  return (
    <View style={styles.card}>
      <View style={styles.handle} />

      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {station.name}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.statusInline}>
              <View
                style={[styles.statusDot, { backgroundColor: statusColor }]}
              />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {station.available}/{station.total} disponíveis
              </Text>
            </View>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{station.maxPower} kW</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{station.timeMin} min</Text>
          </View>
        </View>
        <LinearGradient
          colors={getScoreGradient(station.score)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.scoreBadge}
        >
          <Text style={styles.scoreValue}>{station.score}</Text>
          <Text style={styles.scoreLabel}>FLUI SCORE</Text>
        </LinearGradient>
      </View>

      {station.amenities.length > 0 && (
        <View style={styles.amenitiesRow}>
          {station.amenities.slice(0, 3).map((a) => (
            <View key={a} style={styles.amenityChip}>
              <Text style={styles.amenityChipText}>{a}</Text>
            </View>
          ))}
        </View>
      )}

      <PrimaryButton
        label="Ver detalhes"
        onPress={() => router.push(`../station/${station.id}`)}
        gradientStyle={{ marginBottom: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.neutral.surfaceMuted,
    alignSelf: "center",
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  name: {
    fontWeight: "700",
    color: colors.neutral.text,
    fontSize: 16,
    marginBottom: 4,
  },
  scoreInline: { fontSize: 11, color: colors.neutral.placeholder },
  scoreBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
  },
  scoreValue: {
    color: colors.neutral.white,
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 22,
  },
  scoreLabel: {
    color: colors.overlay.white85,
    fontSize: 8,
    fontWeight: "600",
    marginTop: 1,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
    rowGap: 4,
  },
  statusInline: { flexDirection: "row", alignItems: "center", gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: "500" },
  metaText: { fontSize: 12, color: colors.neutral.textSubtle },
  metaDot: { fontSize: 12, color: colors.neutral.textSubtle },
  amenitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
    marginTop: 8,
  },
  amenityChip: {
    backgroundColor: colors.neutral.borderLight,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  amenityChipText: { fontSize: 11, color: colors.neutral.textMuted },
});
