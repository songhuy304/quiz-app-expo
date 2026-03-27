import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Text, TouchableOpacity, type TouchableOpacityProps, View } from "react-native";

import { cn } from "@/lib/utils";

const optionVariants = cva(
  "flex-row items-center rounded-2xl p-3.5 gap-3.5 border bg-white",
  {
    variants: {
      status: {
        idle: "border-gray-200",
        selected: "border-2 border-indigo-500 bg-indigo-50",
        correct: "border-2 border-green-500 bg-green-50",
        incorrect: "border-2 border-red-400 bg-red-50",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

const badgeVariants = cva("w-7 h-7 rounded-full items-center justify-center", {
  variants: {
    status: {
      idle: "bg-gray-100",
      selected: "bg-indigo-500",
      correct: "bg-green-500",
      incorrect: "bg-red-400",
    },
  },
  defaultVariants: {
    status: "idle",
  },
});

const badgeTextVariants = cva("text-xs font-bold", {
  variants: {
    status: {
      idle: "text-gray-500",
      selected: "text-white",
      correct: "text-white",
      incorrect: "text-white",
    },
  },
  defaultVariants: {
    status: "idle",
  },
});

type QuizOptionProps = Omit<TouchableOpacityProps, "children"> &
  VariantProps<typeof optionVariants> & {
    label: string;
    text: string;
  };

export type QuizOptionStatus = NonNullable<QuizOptionProps["status"]>;

export function QuizOption({
  label,
  text,
  status,
  className,
  disabled,
  ...props
}: QuizOptionProps) {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      className={cn(optionVariants({ status }), className)}
    >
      <View className={cn(badgeVariants({ status }))}>
        <Text className={cn(badgeTextVariants({ status }))}>{label}</Text>
      </View>

      <Text className="text-sm font-medium text-gray-800 flex-1">{text}</Text>
    </TouchableOpacity>
  );
}
