import React from "react";
import { router, useRouter, } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { Logo } from "@/components/logo";
import { Text } from "@/components/ui/text";
import { LoginForm } from "@/features/auth/login.form";
import { LoginSchema } from "@/features/auth/validations/login.schema";
import { Facebook } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const onLogin = (values: LoginSchema) => {
    console.log(values)
    router.replace("/(tabs)");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 bg-white px-6 py-10 justify-center">
        <View className="w-full max-w-sm self-center">
          <View className="items-center mb-8">
            <Logo width={60} height={60} className="text-foreground" />
          </View>

          <View className="mb-6 items-center">
            <Text className="text-2xl font-semibold">Sign in to your account</Text>
          </View>

          <LoginForm onSubmit={onLogin} />

          <View className="items-center mt-6">
            <Text className="text-xs text-muted-foreground">other way to sign in</Text>
          </View>

          <View className="flex-row justify-center gap-6 mt-2">
            <Pressable className="h-12 w-12 rounded-full border border-input items-center justify-center">
              <Text className="font-semibold"><Facebook /></Text>
            </Pressable>
            <Pressable className="h-12 w-12 rounded-full border border-input items-center justify-center">
              <Text className="font-semibold"><Facebook /></Text>
            </Pressable>
          </View>

          <View className="flex-row justify-center mt-4">
            <Text className="text-sm text-muted-foreground">Don&apos;t have an account? </Text>
            <Pressable onPress={() => router.push("/auth/register")}>
              <Text className="text-sm text-foreground font-semibold">Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
