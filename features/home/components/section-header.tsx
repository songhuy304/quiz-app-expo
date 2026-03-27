import { View, Text, TouchableOpacity } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onClick, children, className }) => {
  return (
    <View className="flex-col flex gap-3">
      <View className={cn("flex-row items-center justify-between", className)}>
        <Text className="text-foreground text-lg font-bold">{title}</Text>
        <TouchableOpacity onPress={onClick} className="flex-row items-center gap-x-1">
          <Text className="text-primary text-sm font-medium">View all</Text>
          <ArrowRight size={14} color="#7C3AED" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}
export { SectionHeader }
