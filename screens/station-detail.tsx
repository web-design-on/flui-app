import { BackIcon, ClockIcon, HeartIcon } from "@/components/icons";
import PrimaryButton from "@/components/primary-button";
import { stations } from "@/lib/data";
import { AppScreen, StationScoreDetails } from "@/lib/types";
import {
  getScoreGradient,
  getScoreLabel,
  getStatusColor,
  unsplashUrl,
} from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  stationId: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.ratingRow}>
      <Text style={styles.ratingLabel}>{label}</Text>
      <View style={styles.ratingTrack}>
        <View style={[styles.ratingFill, { width: `${(value / 5) * 100}%` }]} />
      </View>
      <Text style={styles.ratingValue}>{value}</Text>
    </View>
  );
}

function ScoreBreakdown({ score }: { score: StationScoreDetails }) {
  const items = [
    { icon: "⚡", label: "Disponibilidade", value: score.availability },
    { icon: "🔌", label: "Potência", value: score.power },
    { icon: "⭐", label: "Avaliações", value: score.ratings },
    { icon: "🛡️", label: "Confiabilidade", value: score.reliability },
    { icon: "☕", label: "Comodidades", value: score.amenities },
  ];
  return (
    <View style={{ gap: 10 }}>
      {items.map((item) => (
        <View key={item.label} style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>{item.label}</Text>
          <View style={styles.breakdownTrack}>
            <View style={[styles.breakdownFill, { width: `${item.value}%` }]} />
          </View>
          <Text style={styles.breakdownValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const movementLabels: Record<string, string> = {
  low: "Baixo movimento",
  moderate: "Movimento moderado",
  high: "Alto movimento",
};

const movementBars = [
  2, 2, 1, 1, 2, 3, 4, 5, 4, 5, 5, 3, 2, 3, 2, 2, 4, 5, 4, 3, 3, 2, 2, 1,
];

export default function StationDetailScreen({
  stationId,
  favorites,
  onToggleFavorite,
  onBack,
  onNavigate,
}: Props) {
  const station = stations.find((s) => s.id === stationId) || stations[0];
  const isFav = favorites.has(stationId);
  const [showScore, setShowScore] = useState(false);
  const statusColor = getStatusColor(station.status);
  const movementLabel = movementLabels[station.movement];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <View style={styles.hero}>
        <Image
          source={{ uri: unsplashUrl(station.unsplashId, 800, 400) }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
          locations={[0, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />
        <TouchableOpacity
          onPress={onBack}
          style={[styles.heroButton, { left: 16 }]}
        >
          <BackIcon color="#8C4BFC" />
        </TouchableOpacity>

        {station.id === "3" && (
          <View style={styles.staleWarning}>
            <Text style={styles.staleWarningIcon}>⚠️</Text>
            <Text style={styles.staleWarningText}>
              Disponibilidade atualizada há 48 min. Os dados podem ter mudado.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{station.name}</Text>
            <Text style={styles.subtitle}>
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

          <TouchableOpacity
            onPress={() => setShowScore(!showScore)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={getScoreGradient(station.score)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.scoreBadge}
            >
              <Text style={styles.scoreValue}>{station.score}</Text>
              <Text style={styles.scoreLabel}>FLUI SCORE</Text>
              {getScoreLabel(station.score) && (
                <Text style={styles.scoreHint}>
                  {getScoreLabel(station.score)}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {showScore && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Como calculamos?</Text>
            <ScoreBreakdown score={station.scoreDetails} />
            <Text style={styles.breakdownFootnote}>
              O Flui Score considera disponibilidade, velocidade, avaliações,
              confiabilidade e comodidades.
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.distanceRow}>
            <ClockIcon />
            <Text style={styles.distanceText}>{station.distanceText}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <PrimaryButton
              label="Como chegar"
              onPress={() => {}}
              style={{ flex: 1 }}
              gradientStyle={{ paddingVertical: 12, marginBottom: 0 }}
            />
            <TouchableOpacity
              onPress={() => onToggleFavorite(stationId)}
              style={[
                styles.saveButton,
                { borderColor: isFav ? "#9333EA" : "#E5E7EB" },
              ]}
            >
              <HeartIcon filled={isFav} />
              <Text
                style={[
                  styles.saveButtonText,
                  { color: isFav ? "#9333EA" : "#6B7280" },
                ]}
              >
                {isFav ? "Salvo" : "Salvar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Carregamento</Text>
            <View style={styles.statusInline}>
              <View
                style={[styles.statusDot, { backgroundColor: statusColor }]}
              />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {station.available}/{station.total} disponíveis
              </Text>
            </View>
          </View>
          <View>
            {station.connectors.map((c, i) => (
              <View
                key={c.type}
                style={[
                  styles.connectorRow,
                  i === station.connectors.length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text style={styles.connectorType}>{c.type}</Text>
                  <Text>·</Text>
                  <Text style={styles.connectorType}>{c.power} kW</Text>
                </View>
                <View style={styles.statusInline}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          c.available > 0 ? "#16A34A" : "#DC2626",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.connectorAvailable,
                      { color: c.available > 0 ? "#15803D" : "#DC2626" },
                    ]}
                  >
                    {c.available} de {c.total}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Horários</Text>
          <View style={styles.hoursRow}>
            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>● Aberto agora</Text>
            </View>
            <Text style={styles.hoursText}>{station.hours}</Text>
          </View>

          <Text style={styles.movementLabel}>Movimento ao longo do dia</Text>
          <View style={styles.movementChart}>
            {movementBars.map((v, i) => {
              const isNow = i === 14;
              const color = isNow
                ? "#9333EA"
                : v <= 2
                  ? "#C4B5FD"
                  : v <= 3
                    ? "#A78BFA"
                    : "#7C3AED";
              return (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: `${v * 20}%`,
                    backgroundColor: color,
                    opacity: isNow ? 1 : 0.7,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </View>
          <View style={styles.movementLabelsRow}>
            <Text style={styles.movementTick}>00h</Text>
            <Text style={styles.movementTick}>06h</Text>
            <Text style={styles.movementTick}>12h</Text>
            <Text style={styles.movementTick}>Agora</Text>
            <Text style={styles.movementTick}>22h</Text>
          </View>

          <Text style={styles.bestTimeText}>
            <Text style={{ fontWeight: "600", color: "#374151" }}>
              Melhor horário:{" "}
            </Text>
            {station.bestTime}
          </Text>
        </View>

        {station.amenities.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Comodidades</Text>
            <View style={styles.amenitiesGrid}>
              {station.amenities.map((a) => (
                <View key={a} style={styles.amenityCell}>
                  <Text style={styles.amenityCellText}>{a}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Avaliações</Text>
          <View style={styles.ratingsSummaryRow}>
            <View style={styles.ratingsSummaryBox}>
              <Text style={styles.ratingsSummaryValue}>{station.rating}</Text>
              <Text style={styles.stars}>
                {"★".repeat(Math.floor(station.rating))}
              </Text>
              <Text style={styles.ratingsSummaryCount}>
                {station.reviewCount} avaliações
              </Text>
            </View>
            <View style={{ flex: 1, gap: 8 }}>
              <RatingBar
                label="Carregamento"
                value={station.ratings.charging}
              />
              <RatingBar
                label="Disponibilidade"
                value={station.ratings.availability}
              />
              <RatingBar label="Limpeza" value={station.ratings.cleanliness} />
              <RatingBar label="Segurança" value={station.ratings.safety} />
              <RatingBar
                label="Comodidades"
                value={station.ratings.amenities}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Experiências recentes</Text>
            <View style={styles.updatedBadge}>
              <Text style={styles.updatedBadgeText}>
                ✓ Atualizado recentemente
              </Text>
            </View>
          </View>
          <View>
            {station.reviews.map((r, i) => (
              <View
                key={r.id}
                style={[
                  styles.reviewRow,
                  i === station.reviews.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{r.author}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <Text style={styles.reviewStars}>{"★".repeat(r.rating)}</Text>
                <Text style={styles.reviewText}>&ldquo;{r.text}&rdquo;</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          // onPress={() => onNavigate({ type: "review", stationId })}
          style={styles.reviewCta}
        >
          <Text style={styles.reviewCtaText}> Avaliar este ponto</Text>
        </TouchableOpacity>

        {station.status === "unavailable" && (
          <View style={styles.unavailableBox}>
            <View style={styles.unavailableHeader}>
              <View style={styles.unavailableDot} />
              <Text style={styles.unavailableTitle}>
                Indisponível no momento
              </Text>
            </View>
            <Text style={styles.unavailableSubtitle}>
              Encontramos{" "}
              {stations.filter((s) => s.status === "available").length} opções
              próximas disponíveis.
            </Text>
            <View style={{ gap: 8 }}>
              {stations
                .filter((s) => s.status === "available")
                .slice(0, 2)
                .map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    onPress={() =>
                      onNavigate({ type: "detail", stationId: s.id })
                    }
                    style={styles.unavailableSuggestionRow}
                  >
                    <Text style={styles.unavailableSuggestionName}>
                      {s.name}
                    </Text>
                    <Text style={styles.unavailableSuggestionTime}>
                      {s.timeMin} min ›
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F9FAFB", marginBottom: 48 },
  hero: { height: 200, backgroundColor: "#EDE9FE" },
  heroImage: { width: "100%", height: "100%" },
  heroButton: {
    position: "absolute",
    top: 32,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  staleWarning: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(255,251,235,0.95)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  staleWarningIcon: { fontSize: 14 },
  staleWarningText: {
    fontSize: 11,
    color: "#B45309",
    fontWeight: "500",
    flex: 1,
  },
  content: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },
  nameRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  title: { fontWeight: "700", color: "#111827", fontSize: 20, lineHeight: 24 },
  subtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  ratingLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  stars: { color: "#FBBF24", fontSize: 13 },
  ratingBold: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  reviewCount: { fontSize: 12, color: "#9CA3AF" },
  scoreBadge: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    lineHeight: 30,
  },
  scoreLabel: {
    fontSize: 9,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
    marginTop: 2,
  },
  scoreHint: { fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 1 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTitle: {
    fontWeight: "700",
    color: "#111827",
    fontSize: 14,
    marginBottom: 12,
  },
  breakdownFootnote: { fontSize: 11, color: "#9CA3AF", marginTop: 12 },
  breakdownRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  breakdownIcon: { fontSize: 14, width: 20 },
  breakdownLabel: { fontSize: 12, color: "#374151", flex: 1 },
  breakdownTrack: {
    width: 80,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  breakdownFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#7C3AED",
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6D28D9",
    width: 20,
    textAlign: "right",
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  distanceText: { fontSize: 14, fontWeight: "500", color: "#374151" },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minWidth: 120,
  },
  saveButtonText: { fontSize: 14, fontWeight: "600" },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusInline: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: "500" },
  connectorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  connectorType: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  connectorPower: { fontSize: 12, color: "#9CA3AF" },
  connectorAvailable: { fontSize: 12, fontWeight: "500" },
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  openBadge: {
    backgroundColor: "#F0FDF4",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  openBadgeText: { fontSize: 11, fontWeight: "600", color: "#16A34A" },
  hoursText: { fontSize: 12, color: "#4B5563" },
  movementLabel: { fontSize: 12, color: "#6B7280", marginBottom: 8 },
  movementChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 32,
  },
  movementLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  movementTick: { fontSize: 9, color: "#9CA3AF" },
  bestTimeText: { fontSize: 12, color: "#6B7280", marginTop: 12 },
  amenitiesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  amenityCell: {
    width: "31%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 4,
  },
  amenityCellText: { fontSize: 12, color: "#4B5563", textAlign: "center" },
  ratingsSummaryRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  ratingsSummaryBox: { alignItems: "center" },
  ratingsSummaryValue: { fontSize: 30, fontWeight: "900", color: "#111827" },
  ratingsSummaryCount: { fontSize: 10, color: "#9CA3AF", marginTop: 2 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingLabel: { fontSize: 11, color: "#4B5563", width: 92 },
  ratingTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  ratingFill: { height: "100%", borderRadius: 999, backgroundColor: "#7C3AED" },
  ratingValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#374151",
    width: 20,
    textAlign: "right",
  },
  updatedBadge: {
    backgroundColor: "#F9FAFB",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  updatedBadgeText: { fontSize: 9, color: "#9CA3AF" },
  reviewRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFB",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewAuthor: { fontSize: 12, fontWeight: "600", color: "#1F2937" },
  reviewDate: { fontSize: 10, color: "#9CA3AF" },
  reviewStars: { color: "#FBBF24", fontSize: 11, marginBottom: 4 },
  reviewText: { fontSize: 12, color: "#4B5563", lineHeight: 17 },
  reviewCta: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9D5FF",
    backgroundColor: "#FAF5FF",
    alignItems: "center",
  },
  reviewCtaText: { fontSize: 14, fontWeight: "600", color: "#7E22CE" },
  unavailableBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  unavailableHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  unavailableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  unavailableTitle: { fontSize: 14, fontWeight: "700", color: "#B91C1C" },
  unavailableSubtitle: { fontSize: 12, color: "#DC2626", marginBottom: 12 },
  unavailableSuggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  unavailableSuggestionName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1F2937",
  },
  unavailableSuggestionTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#16A34A",
  },
});
