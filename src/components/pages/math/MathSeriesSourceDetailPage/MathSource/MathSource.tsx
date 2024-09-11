// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
// ui
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import CalendarTrigger from '@/components/shadcn-ui-custom/CalendarTrigger/CalendarTrigger';
import { 
  Switch,
} from '@/components/shadcn-ui/ui/switch';
// type
import { 
  TMathSeriesSourcePageStoreDetailSource,
} from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore.type';
import { 
  cmsClassTypeOptions,
  cmsElementaryGradeMapper,
  cmsGradeOptions,
  cmsSourceTypeOptions,
  cmsTermOptions,
  TCMSClassType,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumOptions,
} from '@/apis/models/mathModel.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import './MathSource.css';

type TMathSourceProps = {
  indexOfSource: number;
  source: TMathSeriesSourcePageStoreDetailSource;
  onChangeSourceIsChecked: (params: {
    indexOfSource: number;
    isChecked: boolean;
  }) => void;
};

function _MathSource(props: TMathSourceProps) {
  const {
    indexOfSource,
    source,
    onChangeSourceIsChecked,
  } = props;

  const {
    // Group: [제품명]
    name,
    // Group: [학교급, 학년, 학기, 교육과정]
    classtype,
    grade,
    term,
    curriculum,
    // Group: [판형, 발행처]
    serviceyear,
    publisher,
    // Group: [사용기한, 사용범위]
    expiration_date,
    source_type,
    // Group: [사용여부]
    isview,
  } = source;

  //
  // mathSeriesSourcePage store
  //
  const updateDetailFormState = useMathSeriesSourcePageStore(state => state.updateDetailFormState);

  //
  // state
  //
  const [isChecked, setIsChecked] = useState(false);

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => {
      const toggledIsChecked = !isChecked;

      onChangeSourceIsChecked({
        indexOfSource,
        isChecked: toggledIsChecked,
      });

      return toggledIsChecked;
    });
  }, [
    indexOfSource,
    onChangeSourceIsChecked,
  ]);

  const updateValueToStore = useCallback((
    value?: any,
    id: string = ''
  ) => {
    const key = extractLastString(id, '__');

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      source_set: old.source_set?.map((source, index) => {
        return index !== indexOfSource
          ? source
          : {
            ...source,
            [key]: value,
          };
      }),
    }));
  }, [indexOfSource, updateDetailFormState]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    updateValueToStore(value, id);
  }, [updateValueToStore]);

  const onChangeSelect = useCallback((
    value: string,
    id: string = ''
  ) => {
    updateValueToStore(value, id);
  }, [updateValueToStore]);

  const onChangeDate = useCallback((
    value: string | undefined,
    id = ''
  ) => {
    updateValueToStore(value, id);
  }, [updateValueToStore]);

  const onChangeClassType = useCallback((value: string) => {
    updateDetailFormState(old => ({
      ...old,
      source_set: old.source_set?.map((source, index) => {
        return index !== indexOfSource
          ? source
          : {
            ...source,
            classtype: value as TCMSClassType,
            grade: cmsElementaryGradeMapper.COMMON,
          };
      }),
    }));
  }, [indexOfSource, updateDetailFormState]);

  const onChangeIsView = useCallback((isChecked: boolean) => {
    updateValueToStore(isChecked, 'isview');
  }, [updateValueToStore]);

  //
  // cache
  //
  const formItemGroups = useMemo(() => [
    // Group: [제품명]
    [
      {
        id: `${indexOfSource}-source__name`,
        label: '제품명',
        Component: (
          <Input
            id={`${indexOfSource}-source__name`}
            className="editor name"
            value={name}
            onChange={onChangeInput} />
        ),
      },
    ], 
    // Group: [학교급, 학년, 학기, 교육과정]
    [
      {
        id: `${indexOfSource}-source__classtype`,
        label: '학교급',
        Component: (
          <CommonSelect
            id={`${indexOfSource}-source__classtype`}
            className="editor"
            placeholder="선택해주세요"
            options={cmsClassTypeOptions}
            value={classtype}
            onChange={onChangeClassType} />
        ),
      },
      {
        id: `${indexOfSource}-source__grade`,
        label: '학년',
        Component: (
          <CommonSelect
            id={`${indexOfSource}-source__grade`}
            className="editor"
            placeholder="선택해주세요"
            options={cmsGradeOptions[classtype]}
            value={String(grade)}
            onChange={onChangeSelect} />
        ),
      },
      {
        id: `${indexOfSource}-source__term`,
        label: '학기',
        Component: (
          <CommonSelect
            id={`${indexOfSource}-source__term`}
            className="editor"
            placeholder="선택해주세요"
            options={cmsTermOptions}
            value={String(term)}
            onChange={onChangeSelect} />
        ),
      },
      {
        id: `${indexOfSource}-source__curriculum`,
        label: '교육과정',
        Component: (
          <CommonSelect
            id={`${indexOfSource}-source__curriculum`}
            className="editor"
            placeholder="선택해주세요"
            options={mathCurriculumOptions}
            value={String(curriculum)}
            onChange={onChangeSelect} />
        ),
      },
    ],
    // Group: [판형, 발행처]
    [
      {
        id: `${indexOfSource}-source__serviceyear`,
        label: '판형',
        Component: (
          <Input
            id={`${indexOfSource}-source__serviceyear`}
            className="editor"
            placeholder=""
            value={serviceyear}
            onChange={onChangeInput} />
        ),
      },
      {
        id: `${indexOfSource}-source__publisher`,
        label: '발행처',
        Component: (
          <Input
            id={`${indexOfSource}-source__publisher`}
            className="editor"
            placeholder=""
            value={publisher}
            onChange={onChangeInput} />
        ),
      },
    ],
    // Group: [사용기한, 사용범위]
    [
      {
        id: `${indexOfSource}-source__expiration_date`,
        label: '사용기한',
        Component: (
          <CalendarTrigger
            id={`${indexOfSource}-source__expiration_date`}
            className="editor"
            placeholder=""
            value={expiration_date}
            onChange={onChangeDate} />
        )
      },
      {
        id: `${indexOfSource}-source__source_type`,
        label: '사용범위',
        Component: (
          <CommonSelect
            id={`${indexOfSource}-source__source_type`}
            className="editor"
            placeholder="선택해주세요"
            options={cmsSourceTypeOptions}
            value={String(source_type)}
            onChange={onChangeSelect} />
        )
      },
    ],
    // Group: [사용여부]
    [
      {
        id: `${indexOfSource}-source__isview`,
        label: '사용여부',
        Component: (
          <div className="editor switch">
            <Switch
              id={`${indexOfSource}-source__isview`}
              checked={isview}
              onCheckedChange={onChangeIsView} />

            <div className="value">
              {isview ? '사용중' : '사용안함'}
            </div>
          </div>
        )
      },
    ],
  ], [
    indexOfSource, 
    name,
    classtype, grade, term, curriculum,
    serviceyear, publisher,
    expiration_date, source_type,
    isview,
    onChangeInput, onChangeSelect, onChangeDate,
    onChangeClassType, onChangeIsView,
  ]);

  return (
    <div className="MathSource">
      <div className="MathSource-header">
        <Checkbox
          className="checkbox"
          checked={isChecked}
          onCheckedChange={onChangeIsChecked} />

        <div className="title">
          출처 : {name || '-'}
        </div>
      </div>

      <div className="MathSource-formBody">
        {formItemGroups.map((group, groupIndex) => {
          return (
            <div
              key={groupIndex}
              className="group">
              {group.map(item => {
                const {
                  id,
                  label,
                  Component,
                } = item;

                return (
                  <div 
                    key={id}
                    className="formItem">
                    <label
                      htmlFor={id}
                      className="label">
                      {label}
                    </label>

                    {Component}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MathSource = memo(_MathSource);
export default MathSource;
