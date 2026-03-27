import * as React from "react";
import { Text, View } from "react-native";

import { CircularProgress } from "@/components/circular-progress";
import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/lib/utils/date.util";
import { getProgressColorByRatio } from "@/lib/utils/progress-color.util";

type QuizHeaderProps = {
  currentQuestion: number;
  totalQuestions: number;
  question: string;
  progressPct: number;
  timeLeft: number;
  totalSeconds: number;
};

export function QuizHeader({
  currentQuestion,
  totalQuestions,
  question,
  progressPct,
  timeLeft,
  totalSeconds,
}: QuizHeaderProps) {
  const remainingRatio = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const timerColor = getProgressColorByRatio(remainingRatio);

  return (
    <>
      <View className="flex-row justify-between items-center mb-3 mt-1">
        <View>
          <Text className="text-xs text-gray-400 font-medium">Câu hỏi</Text>
          <Text className="text-3xl font-black text-indigo-600">
            {currentQuestion}
            <Text className="text-gray-300">/{totalQuestions}</Text>
          </Text>
        </View>

        <CircularProgress
          renderLabel={formatTime(timeLeft)}
          value={timeLeft}
          max={totalSeconds}
          progressColor={timerColor}
          labelColor={timerColor}
        />
      </View>

      <View className="mb-6">
        <Progress value={progressPct} />
      </View>

      <View className="bg-fuchsia-50 rounded-2xl p-5 mb-6 overflow-hidden">
        <View
          className="absolute -right-2.5 -top-2.5 w-20 h-20 rounded-xl bg-violet-200 opacity-50"
          style={{ transform: [{ rotate: "20deg" }] }}
        />
        <View
          className="absolute right-7 -bottom-4 w-14 h-14 rounded-lg bg-purple-200 opacity-40"
          style={{ transform: [{ rotate: "35deg" }] }}
        />
        <Text className="text-lg font-bold text-indigo-950">{question}</Text>
      </View>
    </>
  );
}