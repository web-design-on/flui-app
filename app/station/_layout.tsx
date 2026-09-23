import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen name="[id]" />
      <Tabs.Screen
        name="[id]/review"
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
