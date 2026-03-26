import { useScrollToTop } from "@react-navigation/native";
import { Search, Bell, ArrowRight } from "lucide-react-native";
import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;

// ── Placeholder image component ──────────────────────────────────────────────
function Placeholder({
  width: w,
  height: h,
  className = "",
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) {
  return (
    <View
      style={{ width: w, height: h }}
      className={`bg-muted rounded-xl ${className}`}
    />
  );
}

// ── Avatar placeholder ────────────────────────────────────────────────────────
function AvatarPlaceholder({ size = 48 }: { size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="bg-muted"
    />
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-foreground text-lg font-bold">{title}</Text>
      <TouchableOpacity className="flex-row items-center gap-x-1">
        <Text className="text-primary text-sm font-medium">View all</Text>
        <ArrowRight size={14} color="#7C3AED" />
      </TouchableOpacity>
    </View>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <ScreenContent scrollRef={ref} />;
}

function ScreenContent({ scrollRef }: { scrollRef: React.RefObject<any> }) {
  const discoverCards = [
    { label: "16 Qs", title: "Get Smarter with Productivity Quiz...", author: "Titus Kitamura" },
    { label: "10 Qs", title: "Great Ideas Come from Brilliant Min...", author: "Alfonso Schuessler" },
  ];

  const authors = ["Rayford", "Willard", "Hannah", "Geoffrey"];

  const collections = [
    { label: "Education" },
    { label: "Games" },
    { label: "Science" },
  ];

  const trending = [
    { label: "12 Qs", title: "Let's Memorize the Names of Flowers", author: "Cyndy Lillibridge" },
    { label: "20 Qs", title: "Earth is Our Home and Will Always be", author: "Elmer Laverty" },
  ];

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-background"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* ── Header ── */}
      <View className="flex-row items-center justify-between px-5 pt-12 pb-4">
        <View className="flex-row items-center gap-x-2">
          <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
            <Text className="text-white font-bold text-sm">Q</Text>
          </View>
          <Text className="text-foreground text-xl font-bold">Quizzo</Text>
        </View>
        <View className="flex-row items-center gap-x-4">
          <TouchableOpacity>
            <Search size={22} color="#374151" strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} color="#374151" strokeWidth={1.8} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Banner ── */}
      <View className="mx-5 mb-6 rounded-2xl bg-primary overflow-hidden px-5 py-5">
        <View className="flex-row">
          {/* Text side */}
          <View className="flex-1 pr-2">
            <Text className="text-white text-base font-bold leading-snug mb-4">
              Play quiz together with{"\n"}your friends now!
            </Text>
            <TouchableOpacity className="self-start bg-white rounded-full px-4 py-2">
              <Text className="text-primary font-semibold text-xs">
                Find Friends
              </Text>
            </TouchableOpacity>
          </View>

          {/* Floating avatars */}
          <View className="w-28 relative">
            {[
              { top: -8, right: 10 },
              { top: 10, right: 52 },
              { top: 30, right: 4 },
              { top: 52, right: 38 },
              { top: 4, right: 80 },
            ].map((pos, i) => (
              <View
                key={i}
                style={{
                  position: "absolute",
                  top: pos.top,
                  right: pos.right,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.6)",
                  overflow: "hidden",
                }}
              >
                <AvatarPlaceholder size={36} />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── Discover ── */}
      <View className="px-5 mb-6">
        <SectionHeader title="Discover" />
        <View className="flex-row gap-x-3">
          {discoverCards.map((card, i) => (
            <TouchableOpacity
              key={i}
              style={{ width: CARD_WIDTH }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              {/* Thumbnail */}
              <View className="relative">
                <Placeholder width={CARD_WIDTH} height={110} className="rounded-none rounded-t-2xl" />
                <View className="absolute top-2 right-2 bg-primary/90 rounded-full px-2 py-0.5">
                  <Text className="text-white text-[10px] font-semibold">{card.label}</Text>
                </View>
              </View>
              {/* Info */}
              <View className="p-2.5">
                <Text className="text-foreground text-xs font-semibold leading-tight mb-1.5" numberOfLines={2}>
                  {card.title}
                </Text>
                <View className="flex-row items-center gap-x-1.5">
                  <AvatarPlaceholder size={16} />
                  <Text className="text-muted-foreground text-[10px]">{card.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Top Authors ── */}
      <View className="px-5 mb-6">
        <SectionHeader title="Top Authors" />
        <View className="flex-row gap-x-5">
          {authors.map((name, i) => (
            <TouchableOpacity key={i} className="items-center gap-y-2">
              <View className="rounded-full border-2 border-primary/20 p-0.5">
                <AvatarPlaceholder size={52} />
              </View>
              <Text className="text-foreground text-xs font-medium">{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Top Collections ── */}
      <View className="px-5 mb-6">
        <SectionHeader title="Top Collections" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
          {collections.map((col, i) => (
            <TouchableOpacity
              key={i}
              className="mx-1 rounded-2xl overflow-hidden"
              style={{ width: 140 }}
            >
              <View className="relative">
                <Placeholder width={140} height={88} className="rounded-2xl rounded-none" />
                <View className="absolute inset-0 bg-black/30 rounded-2xl" />
                <View className="absolute bottom-0 left-0 right-0 p-2.5">
                  <Text className="text-white text-xs font-bold">{col.label}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Trending Quiz ── */}
      <View className="px-5">
        <SectionHeader title="Trending Quiz" />
        <View className="flex-row gap-x-3">
          {trending.map((card, i) => (
            <TouchableOpacity
              key={i}
              style={{ width: CARD_WIDTH }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              <View className="relative">
                <Placeholder width={CARD_WIDTH} height={110} className="rounded-none rounded-t-2xl" />
                <View className="absolute top-2 right-2 bg-primary/90 rounded-full px-2 py-0.5">
                  <Text className="text-white text-[10px] font-semibold">{card.label}</Text>
                </View>
              </View>
              <View className="p-2.5">
                <Text className="text-foreground text-xs font-semibold leading-tight mb-1.5" numberOfLines={2}>
                  {card.title}
                </Text>
                <View className="flex-row items-center gap-x-1.5">
                  <AvatarPlaceholder size={16} />
                  <Text className="text-muted-foreground text-[10px]">{card.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
