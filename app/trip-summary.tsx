import { router, useLocalSearchParams } from "expo-router";
import { historyItems, stations } from "../lib/data";
import TripSummaryScreen from "../screens/trip-summary";

export default function TripSummaryRoute() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const item = historyItems.find((h) => h.id === id) ?? historyItems[0];
  const station = stations.find((s) => s.id === item.stationId) ?? stations[0];

  return (
    <TripSummaryScreen
      item={item}
      station={station}
      onBack={() => router.back()}
      onSelectStation={(stationId) => router.push(`/station/${stationId}`)}
    />
  );
}
