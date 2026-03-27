import { Banner, DiscoverSection, Header, TopAuthorsSection, TopCollectionsSection, TrendingSection } from "@/features/home/components";
import { useScrollToTop } from "@react-navigation/native";
import * as React from "react";
import {
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <ScreenContent scrollRef={ref} />;
}
function ScreenContent({ scrollRef }: { scrollRef: React.RefObject<any> }) {
  return (
    <SafeAreaView className="flex-1 bg-background px-5" edges={["top"]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Header />
        <Banner />
        <DiscoverSection />
        <TopAuthorsSection />
        <TopCollectionsSection />
        <TrendingSection />
      </ScrollView>
    </SafeAreaView>
  );
}
