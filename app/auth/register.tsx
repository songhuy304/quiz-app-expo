import { Text } from "@/components/ui";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";

export default function RegisterScreen() {
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (credentials: any) => {
    try {
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
      Alert.alert(
        "Registration Failed",
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <View className="w-full max-w-sm">
          <View className="items-center mb-8">
            <Text className="text-gray-600 mb-4 text-center">Sign up to get started</Text>
          </View>

          {error && (
            <View className="bg-red-100 p-3 rounded-md mb-4">
              <Text className="text-red-700">{error}</Text>
            </View>
          )}

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Pressable onPress={() => router.push("/auth/login")}>
              <Text className="text-indigo-700 font-bold">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
