import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/theme/colors";
import { BackIcon } from "./icons";
import PrimaryButton from "./primary-button";

export interface StationFilters {
  intents: string[];
  connectors: string[];
  minPower: number | null;
  amenities: string[];
}

export const createEmptyFilters = (): StationFilters => ({
  intents: [],
  connectors: [],
  minPower: null,
  amenities: [],
});

export const EMPTY_FILTERS = createEmptyFilters();

interface Props {
  visible: boolean;
  initialFilters: StationFilters;
  onClose: () => void;
  onApply: (filters: StationFilters) => void;
}

const intentOptions = [
  "Carregar rápido",
  "Economizar",
  "Aberto 24h",
  "Aberto agora",
  "Baixo movimento",
  "Seguro à noite",
  "Confortável para esperar",
];

const connectorOptions = ["CCS2", "CHAdeMO", "Tipo 2"];
const powerOptions = [50, 100, 150];
const amenityOptions = [
  "Café",
  "Restaurante",
  "Banheiro",
  "Wi-Fi",
  "Estacionamento",
  "Cobertura",
  "Acessibilidade",
];

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function StationFilterModal({
  visible,
  initialFilters,
  onClose,
  onApply,
}: Props) {
  const [filters, setFilters] = useState<StationFilters>(initialFilters);

  useEffect(() => {
    if (!visible) return;

    setFilters({
      intents: [...initialFilters.intents],
      connectors: [...initialFilters.connectors],
      minPower: initialFilters.minPower,
      amenities: [...initialFilters.amenities],
    });
  }, [visible, initialFilters]);

  const handleClear = () => setFilters(createEmptyFilters());

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <BackIcon color={colors.neutral.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filtrar pontos</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>
              O que é importante para você?
            </Text>
            <View style={styles.chipsWrap}>
              {intentOptions.map((option) => {
                const selected = filters.intents.includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      setFilters((f) => ({
                        ...f,
                        intents: toggleInArray(f.intents, option),
                      }))
                    }
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Conector</Text>
            <View style={styles.chipsWrap}>
              {connectorOptions.map((option) => {
                const selected = filters.connectors.includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      setFilters((f) => ({
                        ...f,
                        connectors: toggleInArray(f.connectors, option),
                      }))
                    }
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Potência mínima</Text>
            <View style={styles.chipsWrap}>
              {powerOptions.map((option) => {
                const selected = filters.minPower === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      setFilters((f) => ({
                        ...f,
                        minPower: f.minPower === option ? null : option,
                      }))
                    }
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextSelected,
                      ]}
                    >
                      {option} kW{option === 150 ? "+" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Comodidades</Text>
            <View style={{ gap: 8 }}>
              {amenityOptions.map((option) => {
                const selected = filters.amenities.includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() =>
                      setFilters((f) => ({
                        ...f,
                        amenities: toggleInArray(f.amenities, option),
                      }))
                    }
                    style={styles.amenityRow}
                  >
                    <Text style={styles.amenityRowText}>{option}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        selected && styles.checkboxSelected,
                      ]}
                    >
                      {selected && <View style={styles.checkboxDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label="Mostrar pontos"
            onPress={handleApply}
            gradientStyle={{ marginBottom: 0 }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.borderLight,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 16, fontWeight: "700", color: colors.neutral.text },
  clearText: { fontSize: 14, fontWeight: "600", color: colors.brand.accent },
  content: { padding: 20, gap: 24 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.neutral.text,
    marginBottom: 10,
  },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.white,
  },
  chipSelected: {
    borderColor: colors.brand.accent,
    backgroundColor: colors.brand.pale,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.neutral.textMuted,
  },
  chipTextSelected: { color: colors.brand.dark },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: colors.neutral.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  amenityRowText: { fontSize: 14, color: colors.neutral.textSecondary },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.neutral.checkbox,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: { borderColor: colors.brand.accent },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand.accent,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.borderLight,
  },
});
