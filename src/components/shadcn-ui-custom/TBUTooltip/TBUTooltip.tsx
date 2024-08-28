// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// ui
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/shadcn-ui/ui/tooltip';
// style
import './TBUTooltip.css';

type TTBUTooltipProps = PropsWithChildren<{
  className?: string;
}>;

function _TBUTooltip(props: TTBUTooltipProps) {
  const {
    className,
    children,
  } = props;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div className={className}>
          {children}
        </div>
      </TooltipTrigger>

      <TooltipContent 
        className="TBUTooltip"
        align="start">
        추후 추가될 기능입니다.
      </TooltipContent>
    </Tooltip>
  );
}

const TBUTooltip = memo(_TBUTooltip) as typeof _TBUTooltip;
export default TBUTooltip;
