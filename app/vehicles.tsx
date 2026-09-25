import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/primary-button";
import { useProfile } from "../lib/profile-context";
import { colors } from "../lib/theme/colors";

const connectorOptions = ["Tipo 2", "CCS2", "CHAdeMO"] as const;
type VehicleConnector = (typeof connectorOptions)[number];

export default function VehiclesScreen() {
  const { vehicles, defaultVehicle, setDefaultVehicle, addVehicle } =
    useProfile();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [batteryKwh, setBatteryKwh] = useState("60");
  const [connector, setConnector] = useState<VehicleConnector>("CCS2");
  const [isDefault, setIsDefault] = useState(true);

  const sortedVehicles = useMemo(
    () =>
      [...vehicles].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)),
    [vehicles],
  );

  const handleAddVehicle = () => {
    const normalizedBrand = brand.trim();
    const normalizedModel = model.trim();

    if (!normalizedBrand || !normalizedModel) {
      Alert.alert("Preencha o nome e o modelo do veículo.");
      return;
    }

    addVehicle({
      brand: normalizedBrand,
      model: normalizedModel,
      name: `${normalizedBrand} ${normalizedModel}`,
      batteryKwh: Number(batteryKwh) || 0,
      connector,
      isDefault,
    });

    setBrand("");
    setModel("");
    setBatteryKwh("60");
    setConnector("CCS2");
    setIsDefault(true);
    Alert.alert("Veículo adicionado", "Seu carro foi salvo com sucesso.");
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Meus veículos</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Adicionar carro elétrico</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Marca</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Ex: BYD"
              placeholderTextColor={colors.neutral.placeholder}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Modelo</Text>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={setModel}
              placeholder="Ex: Dolphin"
              placeholderTextColor={colors.neutral.placeholder}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Bateria (kWh)</Text>
              <TextInput
                style={styles.input}
                value={batteryKwh}
                onChangeText={setBatteryKwh}
                placeholder="60"
                keyboardType="numeric"
                placeholderTextColor={colors.neutral.placeholder}
              />
            </View>

            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Conector</Text>
              <View style={styles.segmentedContainer}>
                {connectorOptions.map((option) => {
                  const active = connector === option;

                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setConnector(option)}
                      style={[
                        styles.segmentChip,
                        active && styles.segmentChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          active && styles.segmentTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsDefault((value) => !value)}
            activeOpacity={0.8}
          >
            <View
              style={[styles.checkbox, isDefault && styles.checkboxSelected]}
            >
              {isDefault ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.checkboxText}>
              Usar como padrão para a próxima viagem
            </Text>
          </TouchableOpacity>

          <PrimaryButton label="Salvar veículo" onPress={handleAddVehicle} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Veículos salvos</Text>

          {sortedVehicles.map((vehicle) => {
            const isSelected = defaultVehicle?.id === vehicle.id;

            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleRow,
                  isSelected && styles.vehicleRowSelected,
                ]}
                activeOpacity={0.8}
                onPress={() => setDefaultVehicle(vehicle.id)}
              >
                <View style={styles.vehicleSummary}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehicleMeta}>
                    {vehicle.batteryKwh} kWh · {vehicle.connector}
                  </Text>
                </View>

                <View
                  style={[
                    styles.defaultBadge,
                    isSelected && styles.defaultBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.defaultBadgeText,
                      isSelected && styles.defaultBadgeTextActive,
                    ]}
                  >
                    {isSelected ? "Padrão" : "Marcar"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.surface,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.brand.pale,
  },
  backText: {
    fontSize: 12,
    color: colors.brand.primary,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.neutral.text,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.neutral.text,
    marginBottom: 16,
  },
  formGroup: {
    gap: 8,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: colors.neutral.textSecondary,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.neutral.text,
    backgroundColor: colors.neutral.surface,
  },
  formRow: {
    flexDirection: "row",
    gap: 10,
  },
  segmentedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  segmentChip: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.surface,
  },
  segmentChipActive: {
    backgroundColor: colors.brand.pale,
    borderColor: colors.brand.border,
  },
  segmentText: {
    fontSize: 11,
    color: colors.neutral.textSubtle,
    fontWeight: "600",
  },
  segmentTextActive: {
    color: colors.brand.text,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral.white,
  },
  checkboxSelected: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  checkmark: {
    color: colors.neutral.white,
    fontSize: 12,
    fontWeight: "800",
  },
  checkboxText: {
    fontSize: 13,
    color: colors.neutral.textSecondary,
    flex: 1,
  },
  vehicleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.neutral.surface,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    marginTop: 10,
  },
  vehicleRowSelected: {
    borderColor: colors.brand.border,
    backgroundColor: colors.brand.pale,
  },
  vehicleSummary: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.neutral.text,
  },
  vehicleMeta: {
    marginTop: 4,
    fontSize: 12,
    color: colors.neutral.textSubtle,
  },
  defaultBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  defaultBadgeActive: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
  defaultBadgeText: {
    fontSize: 11,
    color: colors.neutral.textSecondary,
    fontWeight: "700",
  },
  defaultBadgeTextActive: {
    color: colors.neutral.white,
  },
});
