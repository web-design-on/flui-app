import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { colors } from "../lib/theme/colors";
import { HistoryItem } from "../lib/types";
import { formatDuration } from "../lib/utils";

interface HistoryScreenProps {
  items: HistoryItem[];
  onSelectTrip: (item: HistoryItem) => void;
  onReview: (stationId: string) => void;
}

const monthOf = (item: HistoryItem) => item.date.split(" ")[1];

function Stars({ rating }: { rating: number }) {
  return (
    <Text style={styles.stars}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
    </Text>
  );
}

export default function HistoryScreen({
  items,
  onSelectTrip,
  onReview,
}: HistoryScreenProps) {
  const totalEnergy = items.reduce((sum, i) => sum + i.energyKwh, 0);
  const totalMinutes = items.reduce((sum, i) => sum + i.duration, 0);

  const summary = [
    {
      label: "Recargas",
      value: String(items.length),
      icon: <Ionicons name="flash" size={20} color={colors.brand.primary} />,
    },
    {
      label: "Energia total",
      value: `${Math.round(totalEnergy * 10) / 10} kWh`,
      icon: (
        <MaterialIcons
          name="battery-charging-full"
          size={22}
          color={colors.brand.primary}
        />
      ),
    },
    {
      label: "Tempo total",
      value: formatDuration(totalMinutes),
      icon: <Ionicons name="time" size={20} color={colors.brand.primary} />,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico</Text>
        <Text style={styles.subtitle}>{items.length} recargas realizadas</Text>
      </View>

      <View style={styles.summaryBar}>
        {summary.map(({ label, value, icon }) => (
          <View key={label} style={styles.summaryCard}>
            {icon}
            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.list}
      >
        {items.map((item, i) => {
          const showMonth = i === 0 || monthOf(items[i - 1]) !== monthOf(item);

          return (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(i * 80).duration(320)}
            >
              {showMonth && (
                <View style={styles.monthRow}>
                  <View style={styles.monthLine} />
                  <Text style={styles.monthLabel}>
                    {monthOf(item)} {new Date().getFullYear()}
                  </Text>
                  <View style={styles.monthLine} />
                </View>
              )}

              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => onSelectTrip(item)}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="flash" size={20} color={colors.brand.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.cardTop}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stationName}>{item.stationName}</Text>
                      <Text style={styles.date}>
                        {item.date} · {item.trip.arrivalTime}
                      </Text>
                    </View>

                    {item.rating ? (
                      <View style={styles.ratingPill}>
                        <Stars rating={item.rating} />
                        <Text style={styles.ratingValue}>{item.rating}</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.reviewButton}
                        onPress={() => onReview(item.stationId)}
                      >
                        <Ionicons
                          name="star-outline"
                          size={14}
                          color={colors.semantic.rating}
                        />
                        <Text style={styles.reviewButtonText}>Avaliar</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.statsRow}>
                    {[
                      { label: "Potência", value: `${item.power} kW` },
                      { label: "Duração", value: `${item.duration} min` },
                      { label: "Veículo", value: item.vehicle },
                      { label: "Energia", value: `${item.energyKwh} kWh` },
                    ].map(({ label, value }) => (
                      <View key={label} style={styles.stat}>
                        <Text style={styles.statLabel}>{label}</Text>
                        <Text style={styles.statValue}>{value}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <Text style={styles.endLabel}>Início do histórico</Text>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  header: {
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  title: { fontSize: 20, fontWeight: "700", color: colors.neutral.text },
  subtitle: { fontSize: 12, color: colors.neutral.textSubtle, marginTop: 2 },
  summaryBar: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.brand.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.neutral.text,
    marginTop: 2,
  },
  summaryLabel: { fontSize: 10, color: colors.neutral.textSubtle },
  list: { paddingHorizontal: 20, paddingVertical: 16, gap: 8 },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  monthLine: { flex: 1, height: 1, backgroundColor: colors.neutral.border },
  monthLabel: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    color: colors.neutral.placeholder,
  },
  card: {
    flexDirection: "row",
    gap: 12,
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
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.brand.pale,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  stationName: { fontSize: 14, fontWeight: "700", color: colors.neutral.text },
  date: { fontSize: 10, color: colors.neutral.placeholder, marginTop: 2 },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stars: { color: colors.semantic.rating, fontSize: 11 },
  ratingValue: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.neutral.textSecondary,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brand.surface,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.brand.dark,
  },
  statsRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 12, marginTop: 8 },
  stat: { flexDirection: "row", alignItems: "center", gap: 4 },
  statLabel: { fontSize: 12, color: colors.neutral.placeholder },
  statValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.neutral.textSecondary,
  },
  endLabel: {
    textAlign: "center",
    fontSize: 12,
    color: colors.neutral.placeholder,
    paddingVertical: 24,
  },
});
