import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/form-field";
import { CheckIcon } from "../../components/icons";
import PasswordField from "../../components/password-field";
import PrimaryButton from "../../components/primary-button";
import { colors } from "../../lib/theme/colors";

type VehicleOption = {
  name: string;
  batteries: string[];
  connectors: string[];
};

const vehicleOptions: VehicleOption[] = [
  {
    name: "BYD Dolphin Mini",
    batteries: ["30,2", "38,9"],
    connectors: ["Tipo 2", "CCS2"],
  },
  { name: "BYD Dolphin", batteries: ["44,9"], connectors: ["Tipo 2", "CCS2"] },
  {
    name: "BYD Dolphin Plus",
    batteries: ["60,5"],
    connectors: ["Tipo 2", "CCS2"],
  },
  { name: "BYD Seal", batteries: ["82,5"], connectors: ["Tipo 2", "CCS2"] },
  {
    name: "BYD Yuan Plus",
    batteries: ["60,5"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "BYD Song Plus",
    batteries: ["18,3"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "GWM Ora 03",
    batteries: ["48,0", "63,1"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "GWM Haval H6 PHEV",
    batteries: ["34,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "Volvo EX30",
    batteries: ["51,0", "69,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "Volvo XC40 Elétrico",
    batteries: ["69,0", "78,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "Volvo C40",
    batteries: ["69,0", "78,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  { name: "GM Bolt", batteries: ["66,0"], connectors: ["Tipo 2", "CCS2"] },
  { name: "JAC E-JS1", batteries: ["30,2"], connectors: ["Tipo 2"] },
  { name: "Renault Kwid E-Tech", batteries: ["26,8"], connectors: ["Tipo 2"] },
  {
    name: "Nissan Leaf",
    batteries: ["40,0", "62,0"],
    connectors: ["Tipo 2", "CHAdeMO"],
  },
  { name: "VW ID.4", batteries: ["77,0"], connectors: ["Tipo 2", "CCS2"] },
  {
    name: "Peugeot e-2008",
    batteries: ["50,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  {
    name: "Renault Mégane E-Tech",
    batteries: ["60,0"],
    connectors: ["Tipo 2", "CCS2"],
  },
  { name: "Kia Niro EV", batteries: ["64,8"], connectors: ["Tipo 2", "CCS2"] },
  {
    name: "Mini Cooper SE",
    batteries: ["32,6"],
    connectors: ["Tipo 2", "CCS2"],
  },
  { name: "Outro", batteries: [], connectors: [] },
];

const allBatteryOptions = [
  "18,3",
  "26,8",
  "30,2",
  "32,6",
  "34,0",
  "38,9",
  "40,0",
  "44,9",
  "48,0",
  "50,0",
  "51,0",
  "60,0",
  "60,5",
  "62,0",
  "63,1",
  "64,8",
  "66,0",
  "69,0",
  "77,0",
  "78,0",
  "82,5",
];
const allConnectorOptions = ["Tipo 2", "CCS2", "CHAdeMO", "Outro"];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ caracteres", ok: password.length >= 8 },
    { label: "Letra maiúscula", ok: /[A-Z]/.test(password) },
    { label: "Número", ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const strengthColors = [
    "",
    colors.semantic.errorBright,
    colors.semantic.warningBright,
    colors.semantic.successBright,
  ];
  const labels = ["", "Fraca", "Média", "Forte"];

  if (!password) return null;

  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: "row", gap: 4, marginBottom: 6 }}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 999,
              backgroundColor:
                i <= score ? strengthColors[score] : colors.neutral.border,
            }}
          />
        ))}
      </View>
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {checks.map((c) => (
            <View
              key={c.label}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: c.ok
                    ? colors.semantic.success
                    : colors.neutral.placeholder,
                }}
              >
                {c.ok ? "✓" : "○"}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: c.ok
                    ? colors.semantic.success
                    : colors.neutral.placeholder,
                }}
              >
                {c.label}
              </Text>
            </View>
          ))}
        </View>
        {score > 0 && (
          <Text
            style={{
              fontSize: 10,
              fontWeight: "600",
              color: strengthColors[score],
            }}
          >
            {labels[score]}
          </Text>
        )}
      </View>
    </View>
  );
}

type Step = "account" | "vehicle" | "done";

export default function RegisterScreen() {
  const [step, setStep] = useState<Step>("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [batteryKwh, setBatteryKwh] = useState("");
  const [connector, setConnector] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setErrors({});
      setName("");
      setEmail("");
      setPassword("");
      setVehicle("");
      setBatteryKwh("");
      setConnector("");
      setStep("account");
    }, []),
  );

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateAccount = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome completo.";
    if (!email.includes("@")) e.email = "Digite um e-mail válido.";
    if (password.length < 8)
      e.password = "A senha deve ter ao menos 8 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === "account" && validateAccount()) setStep("vehicle");
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
      setTimeout(() => router.push("../(tabs)"), 2500);
    }, 1400);
  };

  const handleLoginRedirect = () => {
    router.push("/(auth)/login");
  };

  const handleVehicleSelect = (name: string) => {
    setVehicle(vehicle === name ? "" : name);
    setBatteryKwh("");
    setConnector("");
  };

  const stepIndex = step === "account" ? 0 : step === "vehicle" ? 1 : 2;
  const selectedVehicle = vehicleOptions.find(
    (option) => option.name === vehicle,
  );
  const batteryOptions = selectedVehicle?.batteries.length
    ? selectedVehicle.batteries
    : allBatteryOptions;
  const connectorOptions = selectedVehicle?.connectors.length
    ? selectedVehicle.connectors
    : allConnectorOptions;

  if (step === "done") {
    return (
      <SafeAreaView style={styles.doneScreen}>
        <LinearGradient
          colors={colors.gradients.scoreGood}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.doneIcon}
        >
          <CheckIcon />
        </LinearGradient>
        <Text style={styles.doneTitle}>Conta criada!</Text>
        <Text style={styles.doneSubtitle}>
          Boas-vindas à Flui, {name.split(" ")[0]}.
        </Text>
        <View style={{ marginTop: 24, flexDirection: "row", gap: 4 }}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={colors.gradients.auth}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView>
          <Text style={styles.title}>
            {step === "account" ? "Crie sua conta" : "Seu veículo"}
          </Text>
          <Text style={styles.subtitle}>
            {step === "account"
              ? "Cadastre-se e encontre os melhores pontos de recarga para seu veículo"
              : "Assim personalizamos as recomendações para você (opcional)"}
          </Text>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={styles.formCard}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flexDirection: "row", gap: 6, marginBottom: 16 }}>
            {["Conta", "Veículo"].map((label, i) => (
              <View key={label} style={{ flex: 1, gap: 4 }}>
                <View
                  style={{
                    height: 4,
                    borderRadius: 999,
                    backgroundColor:
                      i <= stepIndex
                        ? colors.brand.dark
                        : colors.neutral.progressInactive,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "500",
                    color:
                      i <= stepIndex
                        ? colors.brand.dark
                        : colors.neutral.progressInactive,
                  }}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {step === "account" && (
            <View style={{ gap: 12, marginBottom: 20 }}>
              <FormField
                label="Nome completo"
                value={name}
                onChangeText={(v: React.SetStateAction<string>) => {
                  setName(v);
                  clearError("name");
                }}
                placeholder="Natali Schers"
                error={errors.name}
              />
              <FormField
                label="E-mail"
                value={email}
                onChangeText={(v: React.SetStateAction<string>) => {
                  setEmail(v);
                  clearError("email");
                }}
                placeholder="seu@email.com.br"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
              <View>
                <PasswordField
                  label="Senha"
                  value={password}
                  onChangeText={(v: React.SetStateAction<string>) => {
                    setPassword(v);
                    clearError("password");
                  }}
                  placeholder="••••••••"
                  error={errors.password}
                />
                <PasswordStrength password={password} />
              </View>
            </View>
          )}

          {step === "vehicle" && (
            <View style={{ gap: 16, marginBottom: 20 }}>
              <View>
                <Text style={[styles.label, { marginBottom: 8 }]}>
                  Modelo do veículo
                </Text>
                <View style={styles.vehicleGrid}>
                  {vehicleOptions.map((option) => {
                    const selected = vehicle === option.name;
                    return (
                      <TouchableOpacity
                        key={option.name}
                        onPress={() => handleVehicleSelect(option.name)}
                        activeOpacity={0.7}
                        style={[
                          styles.vehicleChip,
                          selected && styles.vehicleChipSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.vehicleChipText,
                            selected && styles.vehicleChipTextSelected,
                          ]}
                        >
                          {option.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View>
                <Text style={styles.label}>Capacidade da bateria (kWh)</Text>
                <View style={styles.batteryRow}>
                  {batteryOptions.map((kwh) => {
                    const selected = batteryKwh === kwh;
                    return (
                      <TouchableOpacity
                        key={kwh}
                        onPress={() =>
                          batteryKwh !== kwh
                            ? setBatteryKwh(kwh)
                            : setBatteryKwh("")
                        }
                        style={[
                          styles.batteryChip,
                          selected && styles.vehicleChipSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.batteryChipText,
                            selected && styles.vehicleChipTextSelected,
                          ]}
                        >
                          {kwh} kWh
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View>
                <Text style={styles.label}>Conector do veículo</Text>
                <View style={styles.batteryRow}>
                  {connectorOptions.map((option) => {
                    const selected = connector === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() =>
                          connector !== option
                            ? setConnector(option)
                            : setConnector("")
                        }
                        style={[
                          styles.batteryChip,
                          selected && styles.vehicleChipSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.batteryChipText,
                            selected && styles.vehicleChipTextSelected,
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
          )}

          {step === "account" && (
            <View>
              <PrimaryButton label="Continuar" onPress={handleNext} />

              <View style={{ alignItems: "center" }}>
                <Text style={styles.footerText}>
                  Já tem uma conta?{" "}
                  <Text style={styles.footerLink} onPress={handleLoginRedirect}>
                    Entrar
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {step === "vehicle" && (
            <View style={{ gap: 12, marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => setStep("account")}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}> Voltar</Text>
              </TouchableOpacity>

              <PrimaryButton
                label="Criar minha conta"
                loadingLabel="Criando conta…"
                loading={loading}
                onPress={handleFinish}
                gradientStyle={{ marginBottom: 0 }}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  header: { paddingHorizontal: 20, paddingTop: 56 },
  title: {
    color: colors.neutral.white,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
  },
  subtitle: { color: colors.overlay.white60, fontSize: 14 },
  formScroll: { flex: 1, marginTop: -32 },
  formCard: {
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    flexGrow: 1,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.neutral.textMuted,
    marginBottom: 6,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vehicleGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  vehicleChip: {
    width: "48%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.white,
  },
  vehicleChipSelected: {
    borderColor: colors.brand.accent,
    backgroundColor: colors.brand.pale,
  },
  vehicleChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral.textMuted,
  },
  vehicleChipTextSelected: { color: colors.brand.dark },
  batteryRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  batteryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral.border,
    backgroundColor: colors.neutral.white,
  },
  batteryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral.textSubtle,
  },
  footerText: { fontSize: 14, color: colors.neutral.textSubtle },
  footerLink: { fontWeight: "700", color: colors.brand.dark },
  doneScreen: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  doneIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: colors.brand.primary,
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  doneTitle: {
    fontWeight: "900",
    color: colors.neutral.text,
    fontSize: 24,
    marginBottom: 4,
  },
  doneSubtitle: {
    fontSize: 14,
    color: colors.neutral.textSubtle,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand.accent,
  },
  backButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.brand.border,
    backgroundColor: colors.brand.surface,
    alignItems: "center",
  },
  backButtonText: { fontSize: 14, fontWeight: "600", color: colors.brand.text },
  reviewCtaText: { fontSize: 14, fontWeight: "600", color: colors.brand.text },
});
