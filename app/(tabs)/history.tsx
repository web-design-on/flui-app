import { router } from "expo-router";
import HistoryScreen from "../../screens/history";
import { historyItems } from "../../lib/data";

export default function HistoryRoute() {
  return (
    <HistoryScreen
      items={historyItems}
      onSelectTrip={(item) =>
        router.push({ pathname: "/trip-summary", params: { id: item.id } })
      }
      // Ainda não existe a tela de avaliação: abre o detalhe do ponto.
      onReview={(id) => router.push(`../station/${id}`)}
    />
  );
}
