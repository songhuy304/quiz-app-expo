import {
  useLocalSearchParams
} from "expo-router";
import * as React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FormScreen() {

  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();


  return (
    <ScrollView
      contentContainerClassName="p-6 mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
    </ScrollView>
  );
}
