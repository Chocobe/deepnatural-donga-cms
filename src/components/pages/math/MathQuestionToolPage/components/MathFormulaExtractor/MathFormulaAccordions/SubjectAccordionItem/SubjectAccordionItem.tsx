// react
import {
  useMemo,
  memo, 
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// ui
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
// type
import { 
  cmsSubjectMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';
// style
import './SubjectAccordionItem.css';

function _SubjectAccordionItem() {
  //
  // mathQuestionToolPage store
  //
  const subjectState = useMathQuestionToolPageStore(state => state.ui.state.result.subject);

  const setSubject_action = useMathQuestionToolPageStore(state => state.ui.action.setSubject_action);

  //
  // cache
  //
  const subjectSelectOptions = useMemo<TCommonSelectOptionItem[]>(() => [
    {
      text: cmsSubjectMapper.MATH,
      value: cmsSubjectMapper.MATH,
    },
  ], []);

  return (
    <div className="SubjectAccordionItem">
      <label 
        className="label"
        htmlFor="subject">
          과목
      </label>

      <Select 
        value={subjectState}
        onValueChange={setSubject_action}>
        <SelectTrigger 
          id="subject"
          className="subject-dropdown">
          <SelectValue placeholder="" />
        </SelectTrigger>

        <SelectContent>
          {subjectSelectOptions.map(options => {
            const {
              text,
              value,
            } = options;

            return (
              <SelectItem
                key={value}
                value={value}>
                {text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

const SubjectAccordionItem = memo(_SubjectAccordionItem);
export default SubjectAccordionItem;
