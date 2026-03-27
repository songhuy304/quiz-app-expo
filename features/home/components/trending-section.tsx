import { View, Dimensions, Pressable } from "react-native";
import { SectionHeader } from "./section-header";
import { AvatarPlaceholder, Placeholder } from "@/features/home/components/placeholder";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 12) / 2;

export function TrendingSection() {
  const router = useRouter();
  const data = [
    {
      label: "12 Qs",
      title: "Let's Memorize the Names of Flowers",
      author: "Cyndy Lillibridge",
    },
    {
      label: "20 Qs",
      title: "Earth is Our Home and Will Always be",
      author: "Elmer Laverty",
    },
  ];

  const handlePress = () => {
    router.push("/quiz");
  };

  return (
    <View>
      <SectionHeader title="Trending Quiz" >

        <View className="flex-row gap-5">
          {data.map((card, i) => (
            <Pressable
              key={i}
              onPress={handlePress}
              style={{ width: CARD_WIDTH }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              <View className="relative">
                <Placeholder width={CARD_WIDTH} height={110} className="rounded-none rounded-t-2xl" />
                <View className="absolute top-2 right-3 bg-primary rounded-full px-2 py-1">
                  <Badge size="xs">
                    <Text>{card.label}</Text>
                  </Badge>
                </View>
              </View>
              <View className="p-2 flex-col gap-2">
                <Text className="text-foreground text-xs font-semibold leading-tight" numberOfLines={2}>
                  {card.title}
                </Text>
                <View className="flex-row items-center gap-2">
                  <AvatarPlaceholder size={16} />
                  <Text className="text-muted-foreground text-[10px]">{card.author}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </SectionHeader>
    </View>
  );
}
