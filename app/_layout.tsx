import { FavoritesProvider } from "@/lib/favorites-context";
import { ProfileProvider } from "@/lib/profile-context";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <FavoritesProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="station" options={{ headerShown: false }} />
            <Stack.Screen name="vehicles" options={{ headerShown: false }} />
            <Stack.Screen
              name="profile-edit"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="trip-summary"
              options={{ headerShown: false }}
            />
          </Stack>
        </FavoritesProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
