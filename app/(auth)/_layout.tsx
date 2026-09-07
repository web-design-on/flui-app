import { Tabs } from "expo-router";
import { colors } from "../../lib/theme/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brand.navigation,
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="welcome" />
    </Tabs>
  );
}
