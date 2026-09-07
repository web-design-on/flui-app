import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../lib/theme/colors";

export default function WelcomeScreen() {
  function onRegister() {
    router.push("/(auth)/register");
  }

  function onLogin() {
    router.push("/(auth)/login");
  }

  return (
    <LinearGradient
      colors={colors.gradients.welcome}
      locations={[0, 0.4, 0.75, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.7, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topArea}>
          <View style={styles.logoBlock}>
            <Image
              source={require("../../assets/images/flui-white.png")}
              style={styles.logo}
            />

            <View style={styles.divider} />
            <Text style={styles.tagline}>
              Não mostramos apenas onde carregar.{"\n"}
              <Text style={styles.taglineBold}>
                Mostramos onde vale a pena.
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.ctaArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onRegister}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Criar minha conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onLogin}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Já tenho conta</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            Ao criar uma conta você concorda com os{" "}
            <Text style={styles.underline}>Termos de Uso</Text> e{" "}
            <Text style={styles.underline}>Política de Privacidade</Text> da
            Flui.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: "center" },
  topArea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoBlock: { alignItems: "center" },
  logo: { width: 100, height: 50, resizeMode: "contain" },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: colors.overlay.white40,
    borderRadius: 999,
    marginTop: 16,
    marginBottom: 16,
  },
  tagline: {
    color: colors.overlay.white75,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    maxWidth: 280,
  },
  taglineBold: { color: colors.neutral.white, fontWeight: "600" },
  ctaArea: {
    paddingHorizontal: 24,
    paddingBottom: 64,
    gap: 12,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  primaryButtonText: {
    color: colors.brand.buttonDark,
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.overlay.white12,
    borderWidth: 2,
    borderColor: colors.overlay.white30,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.neutral.white,
    fontWeight: "600",
    fontSize: 14,
  },
  terms: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 14,
    color: colors.overlay.white40,
    paddingHorizontal: 16,
  },
  underline: { textDecorationLine: "underline" },
});
