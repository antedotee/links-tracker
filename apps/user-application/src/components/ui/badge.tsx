import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-2 px-2 py-0.5 text-xs font-semibold tracking-tight w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow,transform] overflow-hidden shadow-[var(--neo-offset-sm)]",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-primary text-primary-foreground [a&]:hover:translate-x-[1px] [a&]:hover:translate-y-[1px] [a&]:hover:shadow-none",
        secondary:
          "border-foreground bg-secondary text-secondary-foreground [a&]:hover:translate-x-[1px] [a&]:hover:translate-y-[1px] [a&]:hover:shadow-none",
        destructive:
          "border-foreground bg-destructive text-white [a&]:hover:translate-x-[1px] [a&]:hover:translate-y-[1px] [a&]:hover:shadow-none focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/90",
        outline:
          "border-foreground bg-background text-foreground shadow-[var(--neo-offset-sm)] [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
