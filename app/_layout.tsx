import { PortalHost } from "@/components/primitives/portal";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { useColorScheme } from "@/lib/useColorScheme";
import { Inter_400Regular, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";


export {
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "auth/login",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { setColorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useFrameworkReady();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setColorScheme("light");
  }, [setColorScheme]);


  return (
    <>
      <StatusBar style={"light"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ title: "Habits", headerShown: false }} />
            <Stack.Screen options={{
              headerShadowVisible: false,
            }} name="habits/archive" />
            <Stack.Screen options={{
              headerShadowVisible: false,
            }} name="habits/[id]" />
            <Stack.Screen
              name="auth/index"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="auth/login"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="auth/register"
              options={{
                headerShown: false
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <PortalHost />
    </>
  );
}
