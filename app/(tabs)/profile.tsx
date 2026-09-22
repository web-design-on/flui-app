import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Path, Polyline } from "react-native-svg";
import { profileMenuItems, userProfile } from "../../lib/data";
import { colors } from "../../lib/theme/colors";

function HeartIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill={colors.brand.accent}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.brand.accent}
      strokeWidth={2}
    >
      <Circle cx={12} cy={12} r={10} />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.neutral.checkbox}
      strokeWidth={2}
    >
      <Path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

export default function ProfileScreen() {
  const summaryStats = [
    {
      label: "Recargas",
      value: String(userProfile.totalRecharges),
      unit: "total",
    },
    {
      label: "Energia",
      value: String(userProfile.totalEnergyKwh),
      unit: "kWh",
    },
    {
      label: "Pontos",
      value: userProfile.stationsLabel,
      unit: "conhecidos",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.userRow}>
            <LinearGradient
              colors={[colors.brand.primary, colors.brand.light]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>{userProfile.avatarInitial}</Text>
            </LinearGradient>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.8}
            // onPress={() => onSwitchTab("favorites")}
          >
            <View
              style={[
                styles.quickActionIconWrap,
                { backgroundColor: colors.brand.pale },
              ]}
            >
              <HeartIcon />
            </View>
            <View>
              <Text style={styles.quickActionLabel}>Favoritos</Text>
              <Text style={styles.quickActionSub}>
                {userProfile.savedFavoritesCount} ponto salvo
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.8}
            // onPress={() => onSwitchTab("history")}
          >
            <View
              style={[
                styles.quickActionIconWrap,
                { backgroundColor: colors.brand.pale },
              ]}
            >
              <ClockIcon />
            </View>
            <View>
              <Text style={styles.quickActionLabel}>Histórico</Text>
              <Text style={styles.quickActionSub}>
                {userProfile.totalRecharges} recargas
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Meu resumo</Text>

        <View style={styles.card}>
          <View style={styles.statsRow}>
            {summaryStats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statUnit}>{stat.unit}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Informações Adicionais</Text>

        <View style={styles.menuCard}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === profileMenuItems.length - 1 && styles.menuItemLast,
              ]}
              activeOpacity={0.6}
            >
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.sub ? (
                  <Text style={styles.menuSub}>{item.sub}</Text>
                ) : null}
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.neutral.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.neutral.white,
  },
  userInfo: {
    flexShrink: 1,
  },
  userName: {
    fontWeight: "700",
    color: colors.neutral.text,
    fontSize: 18,
  },
  userEmail: {
    fontSize: 13,
    color: colors.neutral.textSubtle,
    marginTop: 2,
  },
  editButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E9D5FF",
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    marginTop: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7E22CE",
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    flexDirection: "row",
    elevation: 1,
  },
  quickActionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  quickActionLabel: {
    fontWeight: "600",
    color: colors.neutral.text,
    fontSize: 13,
  },
  quickActionSub: {
    fontSize: 11,
    color: colors.neutral.placeholder,
    marginTop: 2,
  },
  sectionTitle: {
    fontWeight: "700",
    color: colors.neutral.text,
    marginTop: 4,
    fontSize: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontWeight: "900",
    color: colors.neutral.text,
    fontSize: 18,
  },
  statLabel: {
    fontSize: 10,
    color: colors.neutral.textSubtle,
    marginTop: 2,
    textAlign: "center",
  },
  statUnit: {
    fontSize: 9,
    color: colors.neutral.placeholder,
  },
  menuCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.neutral.borderLight,
    overflow: "hidden",
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.surface,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuTextWrap: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral.textSecondary,
  },
  menuSub: {
    fontSize: 12,
    color: colors.neutral.placeholder,
    marginTop: 1,
  },
  signOutButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.semantic.errorBorder,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.semantic.error,
  },
});
