import { View } from "react-native";

interface PlaceholderProps {
  width?: number | string | undefined;
  height?: number | string | undefined;
  className?: string;
}

const Placeholder = ({
  width: w,
  height: h,
  className = "",
}: PlaceholderProps) => {
  return (
    <View
      style={{ width: typeof w === 'number' ? w : Number(w), height: typeof h === 'number' ? h : Number(h) }}
      className={`bg-muted rounded-xl ${className}`}
    />
  );
}


// ── Avatar placeholder ────────────────────────────────────────────────────────
function AvatarPlaceholder({ size = 48 }: { size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="bg-muted"
    />
  );
}

export { Placeholder, AvatarPlaceholder };
