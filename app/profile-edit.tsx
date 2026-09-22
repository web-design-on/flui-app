import { router } from "expo-router";
import { useState } from "react";
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
import FormField from "../components/form-field";
import PrimaryButton from "../components/primary-button";
import { useProfile } from "../lib/profile-context";
import { colors } from "../lib/theme/colors";

export default function ProfileEditScreen() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [birthDate, setBirthDate] = useState(profile.birthDate);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = "Informe seu nome completo.";
    if (!email.includes("@")) nextErrors.email = "Digite um e-mail válido.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      birthDate: birthDate.trim(),
    });
    router.push("/(tabs)/profile");
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Dados cadastrais</Text>
          <Text style={styles.subtitle}>
            Mantenha suas informações atualizadas para uma experiência melhor.
          </Text>

          <View style={styles.form}>
            <FormField
              label="Nome completo"
              value={name}
              onChangeText={(value) => {
                setName(value);
                clearError("name");
              }}
              placeholder="Natali Schers"
              error={errors.name}
            />
            <FormField
              label="E-mail"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                clearError("email");
              }}
              placeholder="seu@email.com.br"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <FormField
              label="Telefone (opcional)"
              value={phone}
              onChangeText={setPhone}
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
            />
            <FormField
              label="Data de nascimento (opcional)"
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
            />
          </View>

          <PrimaryButton label="Salvar alterações" onPress={handleSave} />
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.neutral.text,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral.textSubtle,
  },
  form: { gap: 14, marginTop: 24, marginBottom: 24 },
  cancelButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9D5FF",
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7E22CE",
  },
});
