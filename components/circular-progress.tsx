import * as React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  value: number;
  max?: number;
  renderLabel?: string;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: "square" | "round" | "butt";
  showLabel?: boolean;
  trackColor?: string;
  progressColor?: string;
  labelColor?: string;
}

const CircularProgress = ({
  value,
  max = 100,
  renderLabel,
  showLabel = true,
  shape = "round",
  size = 70,
  strokeWidth,
  circleStrokeWidth = 7,
  progressStrokeWidth = 7,
  trackColor = "#e5e7eb",
  progressColor = "#3b82f6",
  labelColor = "#4f46e5",
}: CircularProgressProps) => {
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const progress = max > 0 ? normalizedValue / max : 0;
  const stroke = strokeWidth ?? Math.max(circleStrokeWidth, progressStrokeWidth);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Svg
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth ?? circleStrokeWidth}
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap={shape}
        />
      </Svg>

      {showLabel && (
        <View style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          alignItems: "center", justifyContent: "center"
        }}>
          <Text className="text-base font-medium" style={{ color: labelColor }}>
            {renderLabel ? renderLabel : `${Math.round(progress * 100)}%`}
          </Text>
        </View>
      )}
    </View>
  );
};

export { CircularProgress };
