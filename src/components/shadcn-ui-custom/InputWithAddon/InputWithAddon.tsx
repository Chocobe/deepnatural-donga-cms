import {
  forwardRef,
  memo,
  InputHTMLAttributes,
  FC
} from "react";
import { cn } from '@/lib/shadcn-ui-utils';

export interface InputWithAddonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  LeftAddon?: FC<any>;
  RightAddon?: FC<any>;
}

const _InputWithAddon = forwardRef<HTMLInputElement, InputWithAddonProps>(({ 
  containerClassName,
  className,
  type,
  LeftAddon,
  RightAddon,
  ...props 
}, ref) => {
  return (
    <div 
      className={cn(
        'w-full relative',
        containerClassName
      )}>
      <input
        type={type}
        className={cn(
          "peer flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          LeftAddon ? "pl-10" : "",
          RightAddon ? "pr-10" : "",
          className
        )}
        ref={ref}
        {...props}/>

      {LeftAddon && (
        <LeftAddon 
          className={cn(
            'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-gray-900',
            props.disabled ? 'cursor-not-allowed opacity-50' : ''
          )} />
      )}

      {RightAddon && (
        <RightAddon 
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-gray-900",
            props.disabled ? 'cursor-not-allowed opacity-50' : ''
          )} />
      )}
    </div>
  );
});
_InputWithAddon.displayName = "InputWithAddon";

export const InputWithAddon = memo(_InputWithAddon) as typeof _InputWithAddon;
