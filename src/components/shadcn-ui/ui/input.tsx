import * as React from "react"

import { cn } from "src/lib/shadcn-ui-utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    isReadOnly?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isReadOnly, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isReadOnly
            ? 'bg-[#f4f4f5] focus-visible:ring-offset-0 focus-visible:ring-0'
            : '',
          className
        )}
        readOnly={isReadOnly}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
