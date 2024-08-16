// react
import {
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
// store
import useMathTextbookDetailStore from '@/store/mathTextbookDetailStore/mathTextbookDetailStore';
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
  mathTextbookClassTypeOptions,
  mathTextbookCurriculumOptions,
  mathTextbookGradeOptions,
  mathTextbookTermOptions,
} from '../../mathPages.type';
// style
import './MathTextbookDetailMain.css';

function MathTextbookDetailMain() {
  //
  // mathTextbookDetail store
  //
  const formState = useMathTextbookDetailStore(state => state.formState);
  const setFormState = useMathTextbookDetailStore(state => state.setFormState);

  //
  // callback
  //
  const onChangeSelect = useCallback((
    value: string, 
    id?: string
  ) => {
    setFormState({
      [id as keyof typeof formState]: value,
    });
  }, [setFormState]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    setFormState({
      [id]: value,
    });
  }, [setFormState]);

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
          value={formState.curriculum}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'classType',
      label: '학교급',
      $element: (
        <FormSelect
          id="classType"
          className="formItem"
          options={mathTextbookClassTypeOptions}
          value={formState.classType}
          onChange={(value, id) => {
            setFormState({
              [id as keyof typeof formState]: value,
              grade: Number(mathTextbookGradeOptions[value][0].value) as typeof formState.grade,
            });
          }} />
      ),
    },
    {
      id: 'grade',
      label: '학년',
      $element: (
        <FormSelect
          id="grade"
          className="formItem"
          options={mathTextbookGradeOptions[formState.classType]}
          value={String(formState.grade)}
          onChange={(value, id) => {
            setFormState({
              [id as keyof typeof formState]: Number(value),
            });
          }} />
      ),
    },
    {
      id: 'term',
      label: '학기',
      $element: (
        <FormSelect
          id="term"
          className="formItem"
          options={mathTextbookTermOptions}
          value={String(formState.term)}
          onChange={(value, id) => {
            setFormState({
              [id as keyof typeof formState]: Number(value),
            });
          }} />
      ),
    },
    {
      id: 'title',
      label: '교과서명',
      $element: (
        <Input
          id="title"
          className="formItem"
          value={formState.title}
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
          value={formState.author}
          onChange={onChangeInput} />
      ),
    },
  ], [
    formState, 
    setFormState, onChangeSelect, onChangeInput,
  ]);

  return (
    <div className="MathTextbookDetailMain">
      <div className="MathTextbookDetailMain-textbookName">
        {formState.title || <>&nbsp;</>}
      </div>

      <form className="MathTextbookDetailMain-form">
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
