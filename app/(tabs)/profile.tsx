import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";

import { SVG } from ""

// ── Mock Data ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question:
      "Which 3 numbers have the same answer whether they're added or multiplied together?",
    options: ["6, 3 and 4", "1, 2 and 3", "2, 4 and 6", "1, 2 and 4"],
    correct: 1,
  },
  {
    id: 2,
    question: "What is the only planet in our solar system that rotates on its side?",
    options: ["Saturn", "Neptune", "Uranus", "Jupiter"],
    correct: 2,
  },
  {
    id: 3,
    question: "How many sides does a heptagon have?",
    options: ["5", "6", "8", "7"],
    correct: 3,
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Aluminum", "Gold", "Argon"],
    correct: 2,
  },
  {
    id: 5,
    question: "What is the square root of 144?",
    options: ["11", "12", "13", "14"],
    correct: 1,
  },
  {
    id: 6,
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1946", "1945"],
    correct: 3,
  },
  {
    id: 7,
    question: "Which ocean is the largest by surface area?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  {
    id: 8,
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1,
  },
  {
    id: 9,
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Bangkok", "Tokyo"],
    correct: 3,
  },
  {
    id: 10,
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    correct: 1,
  },
];

const TOTAL = QUESTIONS.length;
const SECONDS_PER_Q = 30;
const OPTION_LABELS = ["a", "b", "c", "d"];

// ── Timer Circle ─────────────────────────────────────────────────────────────
function TimerCircle({ seconds, total }: { seconds: number; total: number }) {
  const SIZE = 52;
  const STROKE = 3.5;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const progress = seconds / total;
  const strokeDashoffset = CIRC * (1 - progress);
  const color = seconds <= 10 ? "#ef4444" : "#3730a3";

  return (
    <View style={{ width: SIZE, height: SIZE }}>
      <SVG
        width={SIZE}
        height={SIZE}
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeDasharray={CIRC}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <View
        style={{
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: seconds <= 10 ? "#ef4444" : "#1e1b4b",
          }}
        >
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </Text>
      </View>
    </View>
  );
}

// ── Result Screen ─────────────────────────────────────────────────────────────
function ResultScreen({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: pct >= 60 ? "#ede9fe" : "#fee2e2",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 36 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "😅"}</Text>
        </View>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#1e1b4b", marginBottom: 8 }}>
          {pct >= 80 ? "Excellent!" : pct >= 60 ? "Well done!" : "Keep trying!"}
        </Text>
        <Text style={{ fontSize: 16, color: "#6b7280", marginBottom: 6 }}>Your score</Text>
        <Text style={{ fontSize: 48, fontWeight: "900", color: "#4f46e5", marginBottom: 4 }}>
          {pct}%
        </Text>
        <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 40 }}>
          {score} / {total} correct
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          style={{
            backgroundColor: "#3730a3",
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 48,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Main Quiz Screen ──────────────────────────────────────────────────────────
export default function Profile() {
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(SECONDS_PER_Q);

  const q = QUESTIONS[current];

  // Timer
  React.useEffect(() => {
    setTimeLeft(SECONDS_PER_Q);
    setSelected(null);
    setConfirmed(false);
  }, [current]);

  React.useEffect(() => {
    if (confirmed || finished) return;
    if (timeLeft === 0) {
      setConfirmed(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, confirmed, finished]);

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (!confirmed) {
      // confirm first
      setConfirmed(true);
      if (selected === q.correct) setScore((s) => s + 1);
      return;
    }
    if (current + 1 >= TOTAL) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setConfirmed(false);
    setFinished(false);
  };

  if (finished) {
    return <ResultScreen score={score} total={TOTAL} onRetry={handleRetry} />;
  }

  const progressWidth = `${((current + 1) / TOTAL) * 100}%`;

  const getOptionStyle = (idx: number) => {
    if (!confirmed) {
      return selected === idx
        ? { border: "2px solid #4f46e5", backgroundColor: "#eef2ff" }
        : { border: "1.5px solid #e5e7eb", backgroundColor: "#fff" };
    }
    if (idx === q.correct)
      return { border: "2px solid #22c55e", backgroundColor: "#f0fdf4" };
    if (idx === selected && idx !== q.correct)
      return { border: "2px solid #ef4444", backgroundColor: "#fef2f2" };
    return { border: "1.5px solid #e5e7eb", backgroundColor: "#fff" };
  };

  const getLabelStyle = (idx: number) => {
    if (!confirmed) {
      return selected === idx
        ? { backgroundColor: "#4f46e5", color: "#fff" }
        : { backgroundColor: "#f3f4f6", color: "#6b7280" };
    }
    if (idx === q.correct) return { backgroundColor: "#22c55e", color: "#fff" };
    if (idx === selected && idx !== q.correct)
      return { backgroundColor: "#ef4444", color: "#fff" };
    return { backgroundColor: "#f3f4f6", color: "#6b7280" };
  };

  const btnLabel =
    confirmed ? (current + 1 >= TOTAL ? "See Result" : "Next") : "Confirm";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: "#9ca3af", fontWeight: "500" }}>
              Question
            </Text>
            <Text style={{ fontSize: 26, fontWeight: "900", color: "#4f46e5" }}>
              {current + 1}
              <Text style={{ color: "#d1d5db" }}>/{TOTAL}</Text>
            </Text>
          </View>
          <TimerCircle seconds={timeLeft} total={SECONDS_PER_Q} />
        </View>

        {/* Progress bar */}
        <View
          style={{
            height: 5,
            backgroundColor: "#e5e7eb",
            borderRadius: 99,
            marginBottom: 24,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: progressWidth as any,
              backgroundColor: "#4f46e5",
              borderRadius: 99,
            }}
          />
        </View>

        {/* Question card */}
        <View
          style={{
            backgroundColor: "#fdf4ff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative bg shapes */}
          <View
            style={{
              position: "absolute",
              right: -10,
              top: -10,
              width: 80,
              height: 80,
              borderRadius: 12,
              backgroundColor: "#e9d5ff",
              opacity: 0.5,
              transform: [{ rotate: "20deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              right: 30,
              bottom: -15,
              width: 60,
              height: 60,
              borderRadius: 8,
              backgroundColor: "#ddd6fe",
              opacity: 0.4,
              transform: [{ rotate: "35deg" }],
            }}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: "#1e1b4b",
              lineHeight: 26,
              zIndex: 1,
            }}
          >
            {q.question}{" "}
            <Text style={{ color: "#a855f7", fontWeight: "700" }}>?</Text>
          </Text>
        </View>

        {/* Options */}
        <View style={{ gap: 12 }}>
          {q.options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSelect(idx)}
              activeOpacity={confirmed ? 1 : 0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 14,
                padding: 14,
                gap: 14,
                ...getOptionStyle(idx),
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 99,
                  alignItems: "center",
                  justifyContent: "center",
                  ...getLabelStyle(idx),
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: getLabelStyle(idx).color }}>
                  {OPTION_LABELS[idx]}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#1f2937",
                  flex: 1,
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Next button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          paddingBottom: 36,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: "#3730a3",
            borderRadius: 18,
            paddingVertical: 18,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            {btnLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
