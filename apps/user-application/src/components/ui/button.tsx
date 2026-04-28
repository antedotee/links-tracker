import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-tight transition-[transform,box-shadow,color,background-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border-2 border-foreground bg-primary text-primary-foreground shadow-[var(--neo-offset-sm)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        destructive:
          "border-2 border-foreground bg-destructive text-white shadow-[var(--neo-offset-sm)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/90",
        outline:
          "border-2 border-foreground bg-background shadow-[var(--neo-offset-sm)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-accent hover:text-accent-foreground hover:shadow-none dark:bg-background dark:border-foreground",
        secondary:
          "border-2 border-foreground bg-secondary text-secondary-foreground shadow-[var(--neo-offset-sm)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
        ghost:
          "border-2 border-transparent hover:border-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "border-transparent font-semibold text-primary underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
