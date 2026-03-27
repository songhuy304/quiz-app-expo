import * as React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type QuizOptionStatus } from "@/features/quiz/components/quiz-option";
import { Button, Text } from "@/components/ui";
import { QuizContent } from "@/features/quiz/components/quiz-content";
import { QuizHeader } from "@/features/quiz/components/quiz-header";
import { useQuiz } from "@/features/quiz/hooks";
import { OPTION_LABELS, QUESTIONS, TOTAL_SECONDS } from "@/features/quiz/mock";
import { ResultScreen } from "@/features/quiz/result.screen";
import { useCountdownTimer } from "@/hooks/use-countdown-timer";
import { LoadingScreen } from "@/components/loading-screen";
const TOTAL = QUESTIONS.length;

export function QuizScreen() {
  const {
    current,
    selected,
    confirmed,
    score,
    finished,
    setFinished,
    selectOption,
    confirmOrNext,
    retry,
  } = useQuiz({
    totalQuestions: TOTAL,
    questions: QUESTIONS,
  });
  const { timeLeft, elapsedSeconds, reset } = useCountdownTimer({
    initialSeconds: TOTAL_SECONDS,
    isRunning: !finished,
    onComplete: () => setFinished(true),
  });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleRetry = React.useCallback(() => {
    retry();
    reset();
  }, [retry, reset]);



  if (loading) {
    return <LoadingScreen />;
  }

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={TOTAL}
        elapsedSeconds={Math.min(elapsedSeconds, TOTAL_SECONDS)}
        totalSeconds={TOTAL_SECONDS}
        onRetry={handleRetry}
      />
    );
  }

  const q = QUESTIONS[current];
  const progressPct = ((current + 1) / TOTAL) * 100;
  const btnLabel = confirmed
    ? current + 1 >= TOTAL
      ? "Xem kết quả"
      : "Tiếp theo"
    : "Xác nhận";

  const getOptionStatus = (idx: number): QuizOptionStatus => {
    if (!confirmed) {
      return selected === idx ? "selected" : "idle";
    }
    if (idx === q.correct) return "correct";
    if (idx === selected && idx !== q.correct) return "incorrect";
    return "idle";
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <QuizHeader
          currentQuestion={current + 1}
          totalQuestions={TOTAL}
          question={q.question}
          progressPct={progressPct}
          timeLeft={timeLeft}
          totalSeconds={TOTAL_SECONDS}
        />

        <QuizContent
          options={q.options}
          optionLabels={OPTION_LABELS}
          confirmed={confirmed}
          getOptionStatus={getOptionStatus}
          onSelectOption={selectOption}
        />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-5 pb-9">
        <Button
          onPress={confirmOrNext}
          variant="default"
          size="lg"
        >
          <Text>{btnLabel}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
