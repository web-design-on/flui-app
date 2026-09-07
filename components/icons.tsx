import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../lib/theme/colors";

export function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <Svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke={colors.neutral.placeholder}
        strokeWidth={2}
      >
        <Path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke={colors.neutral.placeholder}
      strokeWidth={2}
    >
      <Path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

export function BellIcon() {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={colors.neutral.textSubtle}
      strokeWidth={2}
    >
      <Path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SearchIcon() {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={colors.neutral.placeholder}
      strokeWidth={2}
    >
      <Circle cx={11} cy={11} r={8} />
      <Path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </Svg>
  );
}

export function ArrowRightIcon({
  color = colors.neutral.placeholder,
}: {
  color?: string;
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckIcon({
  size = 40,
  strokeWidth = 2.5,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={colors.neutral.white}
      strokeWidth={strokeWidth}
    >
      <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BackIcon({ color = colors.neutral.white }: { color?: string }) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
    >
      <Path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill={filled ? colors.brand.accent : "none"}
      stroke={filled ? colors.brand.accent : colors.neutral.textSubtle}
      strokeWidth={2}
    >
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
}

export function ClockIcon({ color = colors.brand.accent }: { color?: string }) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function FilterIcon({
  color = colors.brand.accent,
}: {
  color?: string;
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Path
        d="M4 6h16M7 12h10M10 18h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LocateIcon({
  color = colors.brand.primary,
}: {
  color?: string;
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Circle cx={12} cy={12} r={3} />
      <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({
  color = colors.neutral.textSubtle,
}: {
  color?: string;
}) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <Path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </Svg>
  );
}
