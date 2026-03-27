import { SectionHeader } from "@/features/home/components/section-header";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - GAP * 4) / 2;

const COLLECTIONS = [
  {
    id: "1",
    name: "Abstract Minds",
    artist: "0xKira",
    floorPrice: "2.4 ETH",
    volume: "184 ETH",
    change: "+12.4%",
    isUp: true,
    image: "https://picsum.photos/seed/col1/300/300",
    avatarImage: "https://picsum.photos/seed/av1/100/100",
  },
  {
    id: "2",
    name: "Neon Dreams",
    artist: "CryptoVision",
    floorPrice: "1.8 ETH",
    volume: "96 ETH",
    change: "+8.1%",
    isUp: true,
    image: "https://picsum.photos/seed/col2/300/300",
    avatarImage: "https://picsum.photos/seed/av2/100/100",
  },
  {
    id: "3",
    name: "Dark Matter",
    artist: "NullSpace",
    floorPrice: "3.1 ETH",
    volume: "240 ETH",
    change: "-3.2%",
    isUp: false,
    image: "https://picsum.photos/seed/col3/300/300",
    avatarImage: "https://picsum.photos/seed/av3/100/100",
  },
  {
    id: "4",
    name: "Pixel Punks",
    artist: "RetroDAO",
    floorPrice: "0.9 ETH",
    volume: "52 ETH",
    change: "+21.7%",
    isUp: true,
    image: "https://picsum.photos/seed/col4/300/300",
    avatarImage: "https://picsum.photos/seed/av4/100/100",
  },
];

function CollectionCard({ item }: { item: (typeof COLLECTIONS)[0] }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{ width: CARD_WIDTH, marginRight: GAP }}
      className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800"
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
          resizeMode="cover"
        />
        <View
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full ${item.isUp ? "bg-emerald-500/90" : "bg-red-500/90"
            }`}
        >
          <Text className="text-white text-xs font-bold">{item.change}</Text>
        </View>
      </View>

      <View className="p-3">
        <View className="flex-row items-center gap-2 mb-2">
          <Image
            source={{ uri: item.avatarImage }}
            className="w-7 h-7 rounded-full border-2 border-violet-500"
          />
          <View className="flex-1">
            <Text className="text-white font-bold text-sm" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-zinc-500 text-xs">{item.artist}</Text>
          </View>
        </View>

        <View className="h-px bg-zinc-800 mb-2" />

        <View className="flex-row justify-between">
          <View>
            <Text className="text-zinc-500 text-xs mb-0.5">Floor</Text>
            <Text className="text-white text-xs font-semibold">{item.floorPrice}</Text>
          </View>
          <View className="items-end">
            <Text className="text-zinc-500 text-xs mb-0.5">Volume</Text>
            <Text className="text-white text-xs font-semibold">{item.volume}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function TopCollectionsSection() {
  return (
    <View className="mb-6">
      <SectionHeader title="Top Collections">
        <View className="flex-row gap-3" />
      </SectionHeader>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {COLLECTIONS.map((item) => (
          <CollectionCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
