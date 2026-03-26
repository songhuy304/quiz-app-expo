import { router } from "expo-router";
import React from "react";
import { ImageBackground, View } from "react-native";

import { Button, Text } from "@/components/ui";

const splashBg = require("@/assets/images/splash-screen-bg.png");

export default function AuthScreen() {
  return (
    <ImageBackground source={splashBg} resizeMode="cover" style={{ flex: 1 }}>
      <View className="flex-1 bg-black/20">
        <View className="flex-1 items-center justify-center px-6">
        </View>

        <View className="px-6 pb-10 gap-3">
          <Button variant="default" size="lg" onPress={() => router.push("/auth/login")}>
            <Text>Đăng nhập</Text>
          </Button>

          <Button variant="secondary" size="lg" onPress={() => router.push("/auth/register")}>
            <Text>Đăng ký</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
