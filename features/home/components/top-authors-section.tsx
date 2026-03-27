import { AvatarPlaceholder, SectionHeader } from "@/features/home/components";
import { homeAuthors } from "@/features/home/data";
import { View, Text, TouchableOpacity } from "react-native";

export function TopAuthorsSection() {

  return (
    <View className="mb-6">
      <SectionHeader title="Top Authors" >
        <View className="flex-row gap-3">
          {homeAuthors.map((name, i) => (
            <TouchableOpacity key={i} className="items-center gap-2">
              <View className="bg-primary/25 rounded-full p-0.5"><AvatarPlaceholder size={52} /></View>
              <Text className="text-foreground text-xs font-medium">{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SectionHeader>

    </View>
  );
}
