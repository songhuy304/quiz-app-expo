// components/ResultScreen.tsx
import * as React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ResultScreenProps {
  score: number;
  total: number;
  /** Giây đã dùng */
  elapsedSeconds: number;
  /** Tổng giây cho phép */
  totalSeconds: number;
  onRetry: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function ResultScreen({
  score,
  total,
  elapsedSeconds,
  totalSeconds,
  onRetry,
}: ResultScreenProps) {
  const wrong = total - score;
  const pct = Math.round((score / total) * 100);

  const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "😅";
  const headline =
    pct >= 80 ? "Xuất sắc!" : pct >= 60 ? "Làm tốt lắm!" : "Cố lên nhé!";

  const ringClass =
    pct >= 80 ? "bg-green-100" : pct >= 60 ? "bg-violet-100" : "bg-red-100";

  const usedPct = Math.min((elapsedSeconds / totalSeconds) * 100, 100);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-7 pb-12 items-center"
        showsVerticalScrollIndicator={false}
      >
        {/* Badge */}
        <View
          className={`w-28 h-28 rounded-full items-center justify-center mt-8 mb-5 ${ringClass}`}
        >
          <Text className="text-5xl">{emoji}</Text>
        </View>

        <Text className="text-2xl font-extrabold text-indigo-950 mb-1">
          {headline}
        </Text>
        <Text className="text-sm text-gray-500 mb-2">Điểm của bạn</Text>
        <Text className="text-6xl font-black text-indigo-600 mb-1">{pct}%</Text>
        <Text className="text-sm text-gray-400 mb-6">
          {score}/{total} câu đúng
        </Text>

        {/* Stat cards */}
        <View className="flex-row gap-3 w-full mb-7">
          <StatCard
            icon="✅"
            value={String(score)}
            label="Câu đúng"
            containerClass="bg-green-50"
            valueClass="text-green-700"
          />
          <StatCard
            icon="❌"
            value={String(wrong)}
            label="Câu sai"
            containerClass="bg-red-50"
            valueClass="text-red-600"
          />
          <StatCard
            icon="⏱"
            value={formatTime(elapsedSeconds)}
            label="Thời gian"
            containerClass="bg-blue-50"
            valueClass="text-blue-700"
          />
        </View>

        {/* Time used bar */}
        <View className="w-full mb-8">
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-xs text-gray-500">Thời gian sử dụng</Text>
            <Text className="text-xs text-gray-500">
              {formatTime(elapsedSeconds)} / {formatTime(totalSeconds)}
            </Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${usedPct}%` }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={onRetry}
          className="bg-indigo-800 rounded-2xl py-5 px-14 active:opacity-80"
        >
          <Text className="text-white text-base font-bold">Làm lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── StatCard ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  containerClass: string;
  valueClass: string;
}

function StatCard({ icon, value, label, containerClass, valueClass }: StatCardProps) {
  return (
    <View className={`flex-1 rounded-2xl p-3.5 items-center gap-1 ${containerClass}`}>
      <Text className="text-2xl">{icon}</Text>
      <Text className={`text-xl font-extrabold ${valueClass}`}>{value}</Text>
      <Text className="text-[11px] text-gray-500 text-center">{label}</Text>
    </View>
  );
}
