import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { homeDiscoverCards } from "@/features/home/data";
import { AvatarPlaceholder, Placeholder, SectionHeader } from "@/features/home/components";

const { width } = Dimensions.get("window");

const PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - PADDING * 2 - GAP) / 2;
const ITEM_HEIGHT = 180;

export function DiscoverSection() {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={{ width: CARD_WIDTH, marginRight: GAP }}
        className="bg-card rounded-2xl overflow-hidden border border-border"
      >
        <View className="relative">
          <Placeholder
            width={CARD_WIDTH}
            height={110}
            className="rounded-none rounded-t-2xl"
          />
          <View className="absolute top-2 right-2 bg-primary/90 rounded-full px-2 py-0.5">
            <Text className="text-white text-[10px] font-semibold">
              {item.label}
            </Text>
          </View>
        </View>

        <View className="p-2">
          <Text
            className="text-foreground text-xs font-semibold leading-tight mb-1"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <View className="flex-row items-center gap-1">
            <AvatarPlaceholder size={16} />
            <Text className="text-muted-foreground text-[10px]">
              {item.author}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mb-6">
      <SectionHeader title="Discover" >
        <Carousel
          data={homeDiscoverCards}
          renderItem={renderItem}
          width={CARD_WIDTH + GAP}
          height={ITEM_HEIGHT}
          style={{
            width: width,
          }}
          loop={false}
          pagingEnabled={false}
          snapEnabled={false}
          scrollAnimationDuration={900}
        />
      </SectionHeader>
    </View>
  );
}
