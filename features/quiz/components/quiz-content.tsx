import * as React from "react";
import { View } from "react-native";

import { QuizOption, type QuizOptionStatus } from "@/features/quiz/components/quiz-option";

type QuizContentProps = {
  options: string[];
  optionLabels: string[];
  confirmed: boolean;
  getOptionStatus: (idx: number) => QuizOptionStatus;
  onSelectOption: (idx: number) => void;
};

export function QuizContent({
  options,
  optionLabels,
  confirmed,
  getOptionStatus,
  onSelectOption,
}: QuizContentProps) {
  return (
    <>
      <View className="gap-3">
        {options.map((opt, idx) => (
          <QuizOption
            key={idx}
            onPress={() => onSelectOption(idx)}
            disabled={confirmed}
            status={getOptionStatus(idx)}
            label={optionLabels[idx]}
            text={opt}
          />
        ))}
      </View>

      <View className="h-20" />
    </>
  );
}
