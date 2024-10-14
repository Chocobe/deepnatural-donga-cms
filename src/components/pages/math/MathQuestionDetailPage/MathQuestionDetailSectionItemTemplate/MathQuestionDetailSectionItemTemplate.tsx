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

type TMathQuestionDetailSectionItemTemplateProps = {
  id?: string;
  label: string;
  fluid?: boolean;
  components: Array<{
    Editor: ReactNode;
    Actions?: ReactNode[];
  }>;
};

function _MathQuestionDetailSectionItemTemplate(props: TMathQuestionDetailSectionItemTemplateProps) {
  const {
    id,
    label,
    fluid,
    components,
  } = props;

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
            Actions,
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

              {Actions && (
                <div className="actionsWrapper">
                  {Actions.map((Action, indexOfAction) => (
                    <div
                      key={indexOfAction}
                      className="action">
                      {Action}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MathQuestionDetailSectionItemTemplate = memo(_MathQuestionDetailSectionItemTemplate);
export default MathQuestionDetailSectionItemTemplate;
