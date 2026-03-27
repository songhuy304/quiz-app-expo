import { type VariantProps, cva } from "class-variance-authority";
import { View } from "react-native";
import * as Slot from "@/components/primitives/slot";
import type { SlottableViewProps } from "@/components/primitives/types";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "web:inline-flex items-center rounded-full border border-border web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary web:hover:opacity-80 active:opacity-80",
        secondary:
          "border-transparent bg-secondary web:hover:opacity-80 active:opacity-80",
        destructive:
          "border-transparent bg-destructive web:hover:opacity-80 active:opacity-80",
        outline: "text-foreground",
      },
      size: {
        xs: "px-1",
        default: "px-2.5 py-0.5",
        sm: "px-2 py-0.5",
        lg: "px-3 py-1",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const badgeTextVariants = cva("text-xs font-semibold text-white", {
  variants: {
    variant: {
      default: "text-white",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BadgeProps = SlottableViewProps & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, size, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
