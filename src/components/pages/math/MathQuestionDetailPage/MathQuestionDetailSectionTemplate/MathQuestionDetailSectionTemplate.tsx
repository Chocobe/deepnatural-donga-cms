// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionDetailSectionTemplate.css';

type TMathQuestionDetailSectionTemplateProps = PropsWithChildren<{
  title?: string;
  variant?: '' | 'chapters'
  className?: string;
}>;

function _MathQuestionDetailSectionTemplate(props: TMathQuestionDetailSectionTemplateProps) {
  const {
    title,
    variant = '',
    className,
    children,
  } = props;

  return (
    <div className={cn(
      'MathQuestionDetailSectionTemplate',
      className
    )}>
      {title && (
        <div className="MathQuestionDetailSectionTemplate-title">
          {title}
        </div>
      )}

      <div className={cn(
        'MathQuestionDetailSectionTemplate-itemsWrapper',
        variant
      )}>
        {children}
      </div>
    </div>
  );
}

const MathQuestionDetailSectionTemplate = memo(_MathQuestionDetailSectionTemplate);
export default MathQuestionDetailSectionTemplate;
