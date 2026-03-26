import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";
import { Pressable } from "../primitives/slot";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const [secure, setSecure] = React.useState(true);

  return (
    <View className="relative">
      <Input {...props} ref={ref} className={cn("pr-10", className)} secureTextEntry={secure} />

      <Pressable
        onPress={() => setSecure(!secure)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Ionicons name={secure ? "eye-off" : "eye"} size={20} color="#888" />
      </Pressable>
    </View>
  );
});

PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
