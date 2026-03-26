import { useScrollToTop } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Text } from "@/components/ui/text";
export default function Home() {


  const ref = React.useRef(null);
  useScrollToTop(ref);

  return (
    <View className="flex flex-1 bg-background  p-8">
      <Stack.Screen
        options={{
          title: "Archived Habits",
        }}
      />
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive this habit ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction className="bg-foreground" onPress={() => console.log("pressed")}>
              <Text>Archive</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
