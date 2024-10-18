// react
import {
  memo,
  ReactNode,
} from 'react';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionDetailSectionItemTemplate.css';

export type TMathQuestionDetailSectionItemTemplateProps = {
  id?: string;
  label: string;
  fluid?: boolean;
  isHide?: boolean;
  components: Array<{
    Editor: ReactNode;
    LeftSideActions?: ReactNode[];
    RightSideActions?: ReactNode[];
  }>;
};

function _MathQuestionDetailSectionItemTemplate(props: TMathQuestionDetailSectionItemTemplateProps) {
  const {
    id,
    label,
    fluid,
    isHide,
    components,
  } = props;

  if (isHide) {
    return null;
  }

  return (
    <div className="MathQuestionDetailSectionItemTemplate">
      <label 
        htmlFor={id}
        className="MathQuestionDetailSectionItemTemplate-label">
        {label}
      </label>

      <div className="MathQuestionDetailSectionItemTemplate-editorsWrapper">
        {components.map((component, index) => {
          const {
            Editor,
            LeftSideActions,
            RightSideActions,
          } = component;

          return (
            <div
              key={index}
              className={cn(
                'editorWrapper',
                { fluid }
              )}>
              <div className={cn(
                'editor',
              )}>
                {Editor}
              </div>

              <div className="actionsWrapper">
                {LeftSideActions && (
                  <div className="leftSide">
                    {LeftSideActions.map((Action, indexOfAction) => (
                      <div
                        key={indexOfAction}
                        className="action">
                        {Action}
                      </div>
                    ))}
                  </div>
                )}

                {RightSideActions && (
                  <div className="rightSide">
                    {RightSideActions.map((Action, indexOfAction) => (
                      <div
                        key={indexOfAction}
                        className="action">
                        {Action}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MathQuestionDetailSectionItemTemplate = memo(_MathQuestionDetailSectionItemTemplate);
export default MathQuestionDetailSectionItemTemplate;
