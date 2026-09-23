import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../../components/primary-button";
import { stations } from "../../../lib/data";
import { colors } from "../../../lib/theme/colors";

const evaluationCriteria = [
  { key: "charging", label: "Carregamento" },
  { key: "availability", label: "Disponibilidade" },
  { key: "cleanliness", label: "Limpeza" },
  { key: "safety", label: "Segurança" },
  { key: "amenities", label: "Comodidades" },
] as const;

type CriteriaRatings = Record<
  (typeof evaluationCriteria)[number]["key"],
  number
>;

export default function StationReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const station = stations.find((item) => item.id === id) ?? stations[0];
  const [rating, setRating] = useState(0);
  const [criteriaRatings, setCriteriaRatings] = useState<CriteriaRatings>({
    charging: 0,
    availability: 0,
    cleanliness: 0,
    safety: 0,
    amenities: 0,
  });
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (Object.values(criteriaRatings).some((value) => value === 0)) {
      setError("Avalie todos os critérios para continuar.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.successScreen}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={36} color={colors.neutral.white} />
        </View>
        <Text style={styles.successTitle}>Avaliação enviada!</Text>
        <Text style={styles.successSubtitle}>
          Obrigado por compartilhar sua experiência em {station.name}.
        </Text>
        <PrimaryButton
          label="Voltar ao ponto"
          onPress={() => router.back()}
          style={styles.successButton}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Como foi sua experiência?</Text>
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.subtitle}>
            Sua avaliação ajuda outros motoristas a escolherem melhor.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Avalie cada critério</Text>
            {evaluationCriteria.map((criterion) => (
              <View key={criterion.key} style={styles.criteriaRow}>
                <Text style={styles.criteriaLabel}>{criterion.label}</Text>
                <View style={styles.criteriaStars}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => {
                        setCriteriaRatings((current) => ({
                          ...current,
                          [criterion.key]: value,
                        }));
                        setError("");
                      }}
                      style={styles.criteriaStarButton}
                      accessibilityLabel={`${criterion.label}: ${value} estrelas`}
                    >
                      <Ionicons
                        name={
                          value <= criteriaRatings[criterion.key]
                            ? "star"
                            : "star-outline"
                        }
                        size={22}
                        color={colors.semantic.warningBright}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
            {error && rating ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Conte sobre sua experiência</Text>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="O que você achou do ponto de recarga?"
              placeholderTextColor={colors.neutral.placeholder}
              multiline
              textAlignVertical="top"
              style={styles.commentInput}
              maxLength={500}
            />
            <Text style={styles.characterCount}>{comment.length}/500</Text>
          </View>

          <PrimaryButton
            label="Enviar avaliação"
            onPress={handleSubmit}
            style={styles.primaryButton}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.neutral.text,
  },
  stationName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: colors.brand.dark,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSubtle,
  },
  card: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.neutral.text,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
  },
  starButton: { padding: 2 },
  criteriaRow: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  criteriaLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.neutral.textSecondary,
  },
  criteriaStars: {
    flexDirection: "row",
    gap: 2,
  },
  criteriaStarButton: {
    padding: 2,
  },
  error: {
    marginTop: 8,
    fontSize: 12,
    color: colors.semantic.errorBright,
  },
  commentInput: {
    minHeight: 130,
    marginTop: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    borderRadius: 12,
    fontSize: 14,
    color: colors.neutral.text,
  },
  primaryButton: {
    marginTop: 16,
  },
  characterCount: {
    marginTop: 6,
    textAlign: "right",
    fontSize: 11,
    color: colors.neutral.placeholder,
  },
  cancelButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9D5FF",
    backgroundColor: "#FAF5FF",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7E22CE",
  },
  successScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: colors.neutral.white,
  },
  successIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.semantic.success,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.neutral.text,
  },
  successSubtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: colors.neutral.textSubtle,
  },
  successButton: { width: "100%", marginTop: 24 },
});
