import { Plus } from "@/components/Icons";
import { useScrollToTop } from "@react-navigation/native";
import { Link } from "expo-router";
import * as React from "react";
import { Pressable, View } from "react-native";

export default function Create() {
  return <ScreenContent />;
}

function ScreenContent() {

  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <View className="flex flex-col basis-full p-8">
      <View className="absolute web:bottom-20 bottom-10 right-8">
        <Link href="/auth" asChild>
        </Link>
      </View>
    </View>
  );
}
