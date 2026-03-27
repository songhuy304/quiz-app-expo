import * as React from "react";

interface QuizQuestion {
  correct: number;
}

interface UseQuizParams {
  totalQuestions: number;
  questions: QuizQuestion[];
  onFinish?: () => void;
}

interface UseQuizReturn {
  current: number;
  selected: number | null;
  confirmed: boolean;
  score: number;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  selectOption: (idx: number) => void;
  confirmOrNext: () => void;
  retry: () => void;
}

export function useQuiz({
  totalQuestions,
  questions,
  onFinish,
}: UseQuizParams): UseQuizReturn {
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    setSelected(null);
    setConfirmed(false);
  }, [current]);

  React.useEffect(() => {
    if (!finished) return;
    onFinish?.();
  }, [finished, onFinish]);

  const selectOption = React.useCallback(
    (idx: number) => {
      if (confirmed || finished) return;
      setSelected(idx);
    },
    [confirmed, finished]
  );

  const confirmOrNext = React.useCallback(() => {
    if (finished) return;

    const currentQuestion = questions[current];
    if (!currentQuestion) {
      setFinished(true);
      return;
    }

    if (!confirmed) {
      setConfirmed(true);
      if (selected === currentQuestion.correct) {
        setScore((prev) => prev + 1);
      }
      return;
    }

    if (current + 1 >= totalQuestions) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
  }, [confirmed, current, finished, questions, selected, totalQuestions]);

  const retry = React.useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  }, []);

  return {
    current,
    selected,
    confirmed,
    score,
    finished,
    setFinished,
    selectOption,
    confirmOrNext,
    retry,
  };
}
