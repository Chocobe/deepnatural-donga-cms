// react
import {
  useMemo,
  useCallback,
  ChangeEvent,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// ui
import FormSelect from '@/components/shadcn-ui-custom/FormSelect/FormSelect';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  textbookClassTypeOptions,
  textbookGradeOptions,
  textbookTermOptions,
} from '@/components/pages/cmsPages.type';
import { 
  mathTextbookCurriculumOptions,
} from '../../mathPages.type';
import { 
  TMathTextbookModel, 
  TMathTextbookModelCurriculum,
} from '@/apis/models/mathModel.type';
import { 
  cmsCommonModelElementaryGradeMapper,
  TCMSCommonModelClassType,
  TCMSCommonModelMiddleHighGrade,
  TCMSCommonModelTerm,
} from '@/apis/models/cmsCommonModel.type';
// style
import './MathTextbookDetailMain.css';

function MathTextbookDetailMain() {
  //
  // mathTextbookPage store
  //
  const detailFormState = useMathTextbookPageStore(state => state.detailFormState);
  
  const updateDetailFormState = useMathTextbookPageStore(state => state.updateDetailFormState);

  //
  // callback
  //
  const onChangeSelect = useCallback((params: Partial<typeof detailFormState>) => {
    updateDetailFormState(old => ({
      ...old,
      ...params,
    }));
  }, [updateDetailFormState]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    updateDetailFormState(old => ({
      ...old,
      [id as keyof TMathTextbookModel]: value,
    } as TMathTextbookModel));
  }, [updateDetailFormState]);

  //
  // cache
  //
  const formItemTemplates = useMemo(() => [
    {
      id: 'curriculum',
      label: '교육과정',
      $element: (
        <FormSelect
          id="curriculum"
          className="formItem"
          options={mathTextbookCurriculumOptions}
          value={detailFormState.curriculum}
          onChange={curriculum => onChangeSelect({
            curriculum: curriculum as TMathTextbookModelCurriculum,
          })} />
      ),
    },
    {
      id: 'classtype',
      label: '학교급',
      $element: (
        <FormSelect
          id="classtype"
          className="formItem"
          options={textbookClassTypeOptions}
          value={detailFormState.classtype}
          onChange={classtype => onChangeSelect({
            classtype: classtype as TCMSCommonModelClassType,
            grade: cmsCommonModelElementaryGradeMapper.COMMON,
          })} />
      ),
    },
    {
      id: 'grade',
      label: '학년',
      $element: (
        <FormSelect
          id="grade"
          className="formItem"
          options={textbookGradeOptions[detailFormState.classtype]}
          value={String(detailFormState.grade)}
          onChange={grade => onChangeSelect({
            grade: Number(grade) as TCMSCommonModelMiddleHighGrade,
          })} />
      ),
    },
    {
      id: 'term',
      label: '학기',
      $element: (
        <FormSelect
          id="term"
          className="formItem"
          options={textbookTermOptions}
          value={String(detailFormState.term)}
          onChange={term => onChangeSelect({
            term: Number(term) as TCMSCommonModelTerm,
          })} />
      ),
    },
    {
      id: 'title',
      label: '교과서명',
      $element: (
        <Input
          id="title"
          className="formItem"
          value={detailFormState.title}
          onChange={onChangeInput} />
      ),
    },
    {
      id: 'author',
      label: '저자',
      $element: (
        <Input
          id="author"
          className="formItem"
          value={detailFormState.author}
          onChange={onChangeInput} />
      ),
    },
  ], [
    detailFormState, 
    onChangeSelect, onChangeInput,
  ]);

  return (
    <div className="MathTextbookDetailMain">
      <div className="MathTextbookDetailMain-textbookName">
        {detailFormState.title || <>&nbsp;</>}
      </div>

      <form 
        className="MathTextbookDetailMain-form"
        onSubmit={e => e.preventDefault()}>
        {formItemTemplates.map(item => {
          const {
            id,
            label,
            $element,
          } = item;

          return (
            <div 
              key={id}
              className="itemWrapper">
              <Label 
                className="label"
                htmlFor={id}>
                {label}
              </Label>

              {$element}
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default MathTextbookDetailMain;
