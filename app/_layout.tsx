import { FavoritesProvider } from "@/lib/favorites-context";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="station" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
