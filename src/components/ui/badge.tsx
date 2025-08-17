import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xl border px-3 py-1 text-xs font-semibold shadow bg-purple-700 text-white hover:bg-purple-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-purple-700 text-white hover:bg-purple-500",
        secondary:
          "border-transparent bg-purple-900 text-purple-300 hover:bg-purple-800",
        destructive:
          "border-transparent bg-purple-950 text-white hover:bg-purple-800",
        outline: "text-purple-400 border-purple-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
