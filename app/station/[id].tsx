import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import StationDetailScreen from "../../screens/station-detail";

export default function StationRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (stationId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(stationId) ? next.delete(stationId) : next.add(stationId);
      return next;
    });
  };

  return (
    <StationDetailScreen
      stationId={id}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onBack={() => router.back()}
      onNavigate={(screen) => {
        if (screen.type === "detail")
          router.push(`../station/${screen.stationId}`);
        if (screen.type === "review")
          router.push(`../station/${screen.stationId}/review`);
      }}
    />
  );
}
