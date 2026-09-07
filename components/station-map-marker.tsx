import { colors } from "@/lib/theme/colors";
import { Station } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface Props {
  station: Station;
  selected?: boolean;
}

export default function StationMapMarker({ station, selected }: Props) {
  const color = getStatusColor(station.status);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.bubble,
          { backgroundColor: color },
          selected && styles.bubbleSelected,
        ]}
      >
        <Ionicons name="location" size={16} color={colors.neutral.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  bubble: {
    borderRadius: 32,
    alignItems: "center",
    elevation: 4,
    padding: 8,
    textAlign: "center",
  },
  bubbleSelected: {
    backgroundColor: colors.brand.accent,
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
});
