import { Button, Text } from "@/components/ui";
import { View } from "react-native";

const Banner = () => {
  return (
    <View className="mb-6 rounded-2xl bg-primary overflow-hidden px-5 py-5">
      <View className="flex-row">
        <View className="flex-1 pr-2">
          <Text className="text-white text-base font-bold leading-snug mb-4">
            Play quiz together with{"\n"}your friends now!
          </Text>
          <Button variant="secondary" size="sm" className="max-w-fit">
            <Text className="text-primary font-semibold text-xs">
              Find Friends
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export { Banner }
