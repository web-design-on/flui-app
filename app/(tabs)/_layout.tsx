import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useCallback } from "react";
import { Platform, Pressable } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { colors } from "../../lib/theme/colors";

function TabButton({
  accessibilityLabel,
  accessibilityState,
  children,
  onLongPress,
  onPress,
  style,
  testID,
}: BottomTabBarButtonProps) {
  const scale = useSharedValue(1);

  const triggerPulse = useCallback(() => {
    scale.value = withSequence(
      withTiming(1.18, { duration: 100 }),
      withTiming(1, { duration: 140 }),
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      onPress={(event) => {
        triggerPulse();
        onPress?.(event);
      }}
      onLongPress={onLongPress}
      android_ripple={{ color: "transparent" }}
      style={[style, {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }]}
      testID={testID}
    >
      <Animated.View pointerEvents="none" style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function TabLayout() {
  const activeColor = colors.brand.primary;
  const inactiveColor = colors.brand.primary;
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
          backgroundColor: "transparent",
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
          tabBarButton: (props) => (
            <TabButton
              accessibilityLabel={props.accessibilityLabel}
              accessibilityState={props.accessibilityState}
              onLongPress={props.onLongPress}
              onPress={props.onPress}
              style={props.style}
              testID={props.testID}
            >
              {props.children}
            </TabButton>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarButton: (props) => (
            <TabButton
              accessibilityLabel={props.accessibilityLabel}
              accessibilityState={props.accessibilityState}
              onLongPress={props.onLongPress}
              onPress={props.onPress}
              style={props.style}
              testID={props.testID}
            >
              {props.children}
            </TabButton>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
