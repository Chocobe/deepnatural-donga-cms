// react
import {
  useMemo,
  useCallback,
  ChangeEvent,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
// ui
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/components/pages/cmsPages.type';
import { 
  mathCurriculumOptions,
} from '../../mathPages.type';
import { 
  TMathTextbookModel, 
  TMathCurriculum,
} from '@/apis/models/mathModel.type';
import { 
  cmsElementaryGradeMapper,
  TCMSClassType,
  TCMSMiddleHighGrade,
  TCMSTerm,
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
        <CommonSelect
          id="curriculum"
          className="formItem"
          options={mathCurriculumOptions}
          value={detailFormState.curriculum}
          onChange={curriculum => onChangeSelect({
            curriculum: curriculum as TMathCurriculum,
          })} />
      ),
    },
    {
      id: 'classtype',
      label: '학교급',
      $element: (
        <CommonSelect
          id="classtype"
          className="formItem"
          options={cmsClassTypeOptions}
          value={detailFormState.classtype}
          onChange={classtype => onChangeSelect({
            classtype: classtype as TCMSClassType,
            grade: cmsElementaryGradeMapper.COMMON,
          })} />
      ),
    },
    {
      id: 'grade',
      label: '학년',
      $element: (
        <CommonSelect
          id="grade"
          className="formItem"
          options={cmsGradeOptions[detailFormState.classtype]}
          value={String(detailFormState.grade)}
          onChange={grade => onChangeSelect({
            grade: Number(grade) as TCMSMiddleHighGrade,
          })} />
      ),
    },
    {
      id: 'term',
      label: '학기',
      $element: (
        <CommonSelect
          id="term"
          className="formItem"
          options={cmsTermOptions}
          value={String(detailFormState.term)}
          onChange={term => onChangeSelect({
            term: Number(term) as TCMSTerm,
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
