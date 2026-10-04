import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-hot disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-paper shadow-brand hover:bg-brand-hot hover:shadow-brand-lift hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-brand-press",
        outline:
          "border-2 border-navy-bright bg-transparent text-navy-mid hover:bg-navy/5",
        "outline-light":
          "border-2 border-paper/55 bg-transparent text-paper hover:bg-paper/10",
        wa: "border-2 border-wa bg-paper text-wa-ink hover:bg-success-bg",
        ghost:
          "bg-transparent font-bold text-navy-bright hover:text-navy",
      },
      size: {
        default: "h-12 rounded-full px-6 text-sm",
        sm: "h-10 rounded-full px-4 text-sm",
        block: "h-12 w-full rounded-full px-6 text-sm",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
