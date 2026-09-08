import { colors } from "@/lib/theme/colors";
import { Station } from "@/lib/types";
import { getStatusColor } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming
} from "react-native-reanimated";

interface Props {
  station: Station;
  selected?: boolean;
}

export default function StationMapMarker({ station, selected }: Props) {
  const color = getStatusColor(station.status);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(selected ? 1.14 : 1, { duration: 220 }) },
      { translateY: withTiming(selected ? -4 : 0, { duration: 220 }) },
    ],
    shadowOpacity: withTiming(selected ? 0.22 : 0.12, { duration: 220 }),
    shadowRadius: withTiming(selected ? 12 : 8, { duration: 220 }),
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.bubble,
          { backgroundColor: color },
          selected && styles.bubbleSelected,
          bubbleStyle,
        ]}
      >
        <Ionicons name="location" size={16} color={colors.neutral.white} />
      </Animated.View>
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
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  bubbleSelected: {
    backgroundColor: colors.brand.accent,
    borderWidth: 2,
    borderColor: colors.neutral.white,
  },
});
