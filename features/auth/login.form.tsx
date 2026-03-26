import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Form, FormElement, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { loginSchema, type LoginSchema } from "@/features/auth/validations/login.schema";
import { cn } from "@/lib/utils";

type LoginFormProps = {
  onSubmit?: (values: LoginSchema) => Promise<void> | void;
  className?: string;
};

const LoginForm = ({ onSubmit, className }: LoginFormProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async values => {
    await onSubmit?.(values);
  });

  return (
    <View className={cn("w-full", className)}>
      <Form {...form}>
        <FormElement className="gap-4" onSubmit={handleSubmit as any}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput
                name={field.name}
                label="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Enter your email address"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput
                name={field.name}
                label="Password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Enter your password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <View className="flex-row justify-end -mt-2">
            <Pressable onPress={() => { }}>
              <Text className="text-sm text-muted-foreground">Forgot password?</Text>
            </Pressable>
          </View>

          <Button size="lg" className="rounded-full mt-2" onPress={handleSubmit}>
            <Text>Sign in</Text>
          </Button>
        </FormElement>
      </Form>
    </View>
  );
};

export { LoginForm };

