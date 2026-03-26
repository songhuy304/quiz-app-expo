import React from "react";
import { ImageProps, Image, View } from "react-native";
const Logomark = require("@/assets/images/Logomark.png");

interface LogoProps extends ImageProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 60, height = 60, style, ...props }: LogoProps) => {
  return (
    <View>
      <Image source={Logomark}
        style={[{ width, height, resizeMode: "cover" }, style]}
        {...props} />
    </View>
  );
};

export { Logo };

