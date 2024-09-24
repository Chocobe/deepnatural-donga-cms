import {
  forwardRef,
  memo,
  InputHTMLAttributes,
  FC
} from "react";
import { cn } from '@/lib/shadcn-ui-utils';

export interface InputWithIconProps
  extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  StartIcon?: FC<any>;
  EndIcon?: FC<any>;
}

const _InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(({ 
  containerClassName,
  className,
  type,
  StartIcon,
  EndIcon,
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
          StartIcon ? "pl-10" : "",
          EndIcon ? "pr-10" : "",
          className
        )}
        ref={ref}
        {...props}/>

      {StartIcon && (
        <StartIcon 
          className={cn(
            'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-gray-900',
            props.disabled ? 'cursor-not-allowed opacity-50' : ''
          )} />
      )}

      {EndIcon && (
        <EndIcon 
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-gray-900",
            props.disabled ? 'cursor-not-allowed opacity-50' : ''
          )} />
      )}
    </div>
  );
});
_InputWithIcon.displayName = "InputWithIcon";

export const InputWithIcon = memo(_InputWithIcon) as typeof _InputWithIcon;
