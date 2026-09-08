import { unsplashUrl } from "@/lib/utils";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { BellIcon, SearchIcon } from "../../components/icons";
import PrimaryButton from "../../components/primary-button";
import StationCard from "../../components/station-card";
import { stations } from "../../lib/data";
import { colors } from "../../lib/theme/colors";

export default function HomeScreen() {
  const featured = stations[0];
  const nearby = stations.slice(1, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={colors.gradients.home}
        locations={[0, 0.5, 1]}
        style={styles.headerSection}
      >
        <View style={styles.topBar}>
          <Image
            source={require("../../assets/images/flui-purple.png")}
            style={styles.logo}
          />
          <View style={styles.topBarActions}>
            <TouchableOpacity style={styles.iconButton}>
              <BellIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingHello}>Olá, Natali!</Text>
          <Text style={styles.greetingTitle}>Onde você quer carregar?</Text>
        </View>

        <TouchableOpacity
          //onPress={() => router.push("/results")}
          style={styles.searchBar}
          activeOpacity={0.8}
        >
          <SearchIcon />
          <Text style={styles.searchPlaceholder}>
            Digite um endereço, cidade ou local…
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.body}>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Melhor opção para você</Text>
            <TouchableOpacity onPress={() => router.push("/map")}>
              <Text style={styles.sectionLink}>Ver mapa</Text>
            </TouchableOpacity>
          </View>

          <Animated.View entering={FadeInUp.duration(400)} exiting={FadeOutDown}>
            <View style={styles.featuredCard}>
              <ImageBackground
                resizeMode="cover"
                style={{ width: "100%", height: 160 }}
                source={{ uri: unsplashUrl(featured.unsplashId, 800, 400) }}
              >
                <View style={styles.updatedBadge}>
                  <Text style={styles.updatedBadgeText}>Atualizado agora</Text>
                </View>
              </ImageBackground>

              <View style={styles.featuredBody}>
                <View style={styles.featuredTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.featuredName}>{featured.name}</Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.stars}>{"★".repeat(5)}</Text>
                      <Text style={styles.ratingValue}>{featured.rating}</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={colors.gradients.scoreGood}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.scoreBadge}
                  >
                    <Text style={styles.scoreValue}>{featured.score}</Text>
                    <Text style={styles.scoreLabel}>FLUI SCORE</Text>
                  </LinearGradient>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.availabilityPill}>
                    <View style={styles.availabilityDot} />
                    <Text style={styles.availabilityText}>
                      {featured.available}/{featured.total} disponíveis
                    </Text>
                  </View>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>{featured.maxPower} kW</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>{featured.timeMin} min</Text>
                </View>

                <View style={styles.reasonBox}>
                  <Text style={styles.reasonText}>
                    &ldquo;{featured.reason}&rdquo;
                  </Text>
                </View>

                <PrimaryButton
                  label="Ver ponto"
                  onPress={() => router.push(`../station/${featured.id}`)}
                  gradientStyle={styles.featuredCta}
                />
              </View>
            </View>
          </Animated.View>
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pontos próximos</Text>
            <TouchableOpacity //onPress={() => router.push("/travel")}
            >
              <Text style={styles.sectionLink}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 12 }}>
            {nearby.map((s, index) => (
              <Animated.View
                key={s.id}
                entering={FadeInUp.delay(index * 120).duration(320)}
              >
                <StationCard
                  station={s}
                  onPress={() => router.push(`../station/${s.id}`)}
                  size="small"
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.neutral.surface },
  headerSection: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 56,
    height: 24,
    resizeMode: "contain",
  },
  topBarActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  greeting: { marginBottom: 8 },
  greetingHello: { color: colors.neutral.textSubtle, fontSize: 16 },
  greetingTitle: {
    color: colors.neutral.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  searchBar: {
    width: "100%",
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchPlaceholder: {
    color: colors.neutral.placeholder,
    fontSize: 14,
    flex: 1,
  },
  body: { paddingHorizontal: 20, paddingBottom: 24, gap: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontWeight: "700", color: colors.neutral.text, fontSize: 16 },
  sectionLink: { fontSize: 12, fontWeight: "500", color: colors.brand.accent },
  featuredCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  featuredHeroIllustration: { opacity: 0.2 },
  updatedBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: colors.overlay.white90,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  updatedBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.neutral.textMuted,
  },
  featuredBody: { padding: 16 },
  featuredTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  featuredName: { fontWeight: "700", color: colors.neutral.text, fontSize: 16 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  stars: { color: colors.semantic.rating, fontSize: 12 },
  ratingValue: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.neutral.textSecondary,
  },
  scoreBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.neutral.white,
    lineHeight: 24,
  },
  scoreLabel: {
    fontSize: 8,
    color: colors.overlay.white85,
    fontWeight: "600",
    marginTop: 1,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
    marginBottom: 12,
  },
  availabilityPill: { flexDirection: "row", alignItems: "center", gap: 4 },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.semantic.successBright,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.semantic.successDark,
  },
  metaText: { fontSize: 12, color: colors.neutral.textSubtle },
  amenitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  metaDot: { fontSize: 12, color: colors.neutral.placeholder },
  reasonBox: {
    backgroundColor: colors.brand.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  reasonText: { fontSize: 12, color: colors.brand.text, lineHeight: 17 },
  featuredCta: { paddingVertical: 10, borderRadius: 12, marginBottom: 0 },
});
