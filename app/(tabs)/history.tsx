import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { stations } from "../../lib/data";
import { colors } from "../../lib/theme/colors";

const historyRecords = [
  { stationId: "1", date: "19 AGO", power: 100, duration: 34, energy: 38, rating: 4.5 },
  { stationId: "6", date: "12 AGO", power: 150, duration: 22, energy: 35, rating: 5 },
  { stationId: "5", date: "5 AGO", power: 75, duration: 41, energy: 42, rating: 4 },
  { stationId: "3", date: "28 JUL", power: 120, duration: 32, energy: 28, rating: 4.5 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <View style={styles.ratingRow}>
      <Text style={styles.stars}>{"★".repeat(Math.floor(rating))}</Text>
      {rating % 1 !== 0 && <Text style={styles.halfStar}>½</Text>}
      <Text style={styles.ratingValue}>{rating}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Histórico</Text>
          <Text style={styles.subtitle}>4 recargas realizadas</Text>
        </View>

        <View style={styles.summaryRow}>
          <SummaryCard icon="flash" value="4" label="Recargas" />
          <SummaryCard icon="battery-full" value="143 kWh" label="Energia total" />
          <SummaryCard icon="time-outline" value="2h09" label="Tempo total" />
        </View>

        <View style={styles.records}>
          {historyRecords.map((record) => {
            const station = stations.find((item) => item.id === record.stationId);
            if (!station) return null;

            return (
              <View key={`${record.stationId}-${record.date}`} style={styles.recordCard}>
                <View style={styles.stationIcon}>
                  <Ionicons name="flash" size={28} color={colors.semantic.warningBright} />
                </View>

                <View style={styles.recordMain}>
                  <TouchableOpacity
                    onPress={() => router.push(`/station/${station.id}`)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.stationName}>
                      {station.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.date}>{record.date}</Text>

                  <View style={styles.metricsRow}>
                    <Metric label="Potência" value={`${record.power} kW`} />
                    <Metric label="Duração" value={`${record.duration} min`} />
                    <Metric label="Energia" value={`${record.energy} kWh`} />
                  </View>
                </View>

                <View style={styles.ratingBadge}>
                  <Stars rating={record.rating} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function SummaryCard({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <Ionicons name={icon} size={24} color={colors.brand.primary} />
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.neutral.white,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    color: colors.neutral.text,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.neutral.textSubtle,
    fontSize: 16,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  summaryCard: {
    flex: 1,
    minHeight: 132,
    borderRadius: 16,
    backgroundColor: colors.brand.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  summaryValue: {
    color: colors.neutral.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  summaryLabel: {
    color: colors.neutral.textSubtle,
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  records: {
    gap: 12,
    padding: 16,
  },
  recordCard: {
    minHeight: 156,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  stationIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.brand.pale,
  },
  recordMain: {
    flex: 1,
    minWidth: 0,
  },
  stationName: {
    color: colors.neutral.text,
    fontSize: 15,
    fontWeight: "700",
    paddingRight: 72,
  },
  date: {
    color: colors.neutral.textSubtle,
    fontSize: 12,
    marginTop: 4,
  },
  ratingBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#FFFBEB",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    color: colors.semantic.warningBright,
    fontSize: 14,
    letterSpacing: -2,
  },
  halfStar: {
    color: colors.semantic.warningBright,
    fontSize: 12,
    marginLeft: -2,
  },
  ratingValue: {
    color: colors.neutral.textSecondary,
    fontSize: 12,
    marginLeft: 5,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
    paddingTop: 0,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    color: colors.neutral.textSubtle,
    fontSize: 12,
  },
  metricValue: {
    color: colors.neutral.textSecondary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
});
