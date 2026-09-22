import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../lib/theme/colors";
import { Station } from "../lib/types";
import { getScoreGradient, getScoreLabel, getStatusColor } from "../lib/utils";

interface Props {
  station: Station;
  onPress: () => void;
  size?: "featured" | "large" | "small";
  showReason?: boolean;
  rightAccessory?: ReactNode;
  showScore?: boolean;
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <LinearGradient
      colors={
        getScoreGradient(score) as unknown as [string, string, ...string[]]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.scoreBadge}
    >
      <Text style={styles.scoreValue}>{score}</Text>
      <Text style={styles.scoreLabel}>Flui Score</Text>
    </LinearGradient>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <Text style={styles.stars}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </Text>
  );
}

export default function StationCard({
  station,
  onPress,
  size = "large",
  showReason = false,
  rightAccessory,
  showScore = true,
}: Props) {
  const statusColor = getStatusColor(station.status);
  const amenities = station.amenities.slice(0, 3);

  if (size === "small") {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.cardMain}
          >
            <Text style={styles.nameSmall} numberOfLines={1}>
              {station.name}
            </Text>
            <View style={styles.metaRowSmall}>
              <View style={styles.statusInline}>
                <View
                  style={[styles.statusDot, { backgroundColor: statusColor }]}
                />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {station.available}/{station.total}
                </Text>
              </View>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>{station.maxPower} kW</Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>{station.timeMin} min</Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.rightAccessory,
              !showScore && !rightAccessory && styles.emptyAccessory,
            ]}
          >
            {showScore && <ScoreBadge score={station.score} />}
            {rightAccessory}
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.topRowLarge}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameLarge} numberOfLines={1}>
            {station.name}
          </Text>
          <View style={styles.ratingRow}>
            <Stars rating={station.rating} />
            <Text style={styles.ratingValue}>{station.rating}</Text>
            <Text style={styles.reviewCount}>
              · {station.reviewCount} avaliações
            </Text>
          </View>
        </View>
        {showScore && <ScoreBadge score={station.score} />}
      </View>

      <View style={styles.metaRowLarge}>
        <View style={styles.statusInline}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {station.available}/{station.total} disponíveis
          </Text>
        </View>
        <Text style={styles.metaText}>⚡ {station.maxPower} kW</Text>
        <Text style={styles.metaText}>🕐 {station.timeMin} min</Text>
      </View>

      {showReason && (
        <View style={styles.reasonBox}>
          <Text style={styles.reasonText}>
            &ldquo;{getScoreLabel(station.score)} equilíbrio entre velocidade,
            disponibilidade e comodidades.&rdquo;
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  scoreBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.neutral.white,
    lineHeight: 20,
  },
  scoreLabel: {
    fontSize: 9,
    color: colors.overlay.white85,
    fontWeight: "500",
    lineHeight: 11,
  },
  stars: { fontSize: 12, color: colors.semantic.rating, letterSpacing: -1 },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  nameSmall: { fontWeight: "600", color: colors.neutral.text, fontSize: 14 },
  cardMain: { flex: 1 },
  rightAccessory: { alignItems: "flex-end", gap: 8 },
  emptyAccessory: { display: "none" },
  metaRowSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
    flexWrap: "wrap",
  },
  amenitiesRowSmall: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  amenityTextSmall: { fontSize: 12, color: colors.neutral.textSubtle },
  topRowLarge: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  nameLarge: { fontWeight: "700", color: colors.neutral.text, fontSize: 16 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    flexWrap: "wrap",
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.neutral.textSecondary,
  },
  reviewCount: { fontSize: 12, color: colors.neutral.placeholder },
  metaRowLarge: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 12,
    rowGap: 4,
    marginTop: 12,
  },
  amenitiesRowLarge: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  amenityPill: {
    backgroundColor: colors.neutral.surface,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  amenityTextLarge: { fontSize: 12, color: colors.neutral.textSubtle },
  reasonBox: {
    backgroundColor: colors.brand.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  reasonText: { fontSize: 12, color: colors.brand.text, lineHeight: 17 },
  statusInline: { flexDirection: "row", alignItems: "center", gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: "500" },
  metaDot: { fontSize: 12, color: colors.neutral.placeholder },
  metaText: { fontSize: 12, color: colors.neutral.textSubtle },
});
