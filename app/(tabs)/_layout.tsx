import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { Platform, View } from "react-native";
import { colors } from "../../lib/theme/colors";

function TabIcon({
  name,
  color,
  focused,
}: {
  name: ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <View>
      <Ionicons name={name} size={26} color={color} />
      {focused && <View />}
    </View>
  );
}

export default function TabLayout() {
  const activeColor = colors.brand.primary;
  const inactiveColor = colors.brand.light;
  const bgColor = colors.neutral.white;
  const borderColor = colors.neutral.borderSubtle;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopWidth: 1,
          borderTopColor: borderColor,
          height: Platform.OS === "ios" ? 88 : 95,
          paddingBottom: 25,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "location" : "location-outline"}
              color={focused ? activeColor : inactiveColor}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
