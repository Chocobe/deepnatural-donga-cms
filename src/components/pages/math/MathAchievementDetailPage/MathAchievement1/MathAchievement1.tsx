// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn-ui/ui/accordion';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import MathAchievement2 from '../MathAchievement2/MathAchievement2';
// icon
import { 
  LuChevronDown,
} from 'react-icons/lu';
// type
import { 
  mathCurriculumOptions,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeClusterOptions,
  TCMSClassType,
  TCMSGradeCluster,
} from '@/apis/models/cmsCommonModel.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathAchievement1.css';

function _MathAchievement1() {
  //
  // mathAchievementPage store
  //
  const detailFormState = useMathAchievementPageStore(state => state.detailFormState);
  const {
    no,
    title,
    curriculum,
    classtype,
    grade_cluster,
    // achievement2_set,
  } = detailFormState;

  const updateDetailFormState = useMathAchievementPageStore(state => state.updateDetailFormState);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('achievement1');

  //
  // callback
  //
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    const key = extractLastString(id, '__');

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      [key]: value,
    }));
  }, [updateDetailFormState]);

  const onChangeSelect = useCallback((
    value: string,
    id: string = ''
  ) => {
    const key = extractLastString(id);

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      [key]: value,
    }));
  }, [updateDetailFormState]);

  const onChangeClassType = useCallback((value: string) => {
    const classtype = value as TCMSClassType;

    updateDetailFormState(old => ({
      ...old,
      classtype,
      grade_cluster: cmsGradeClusterOptions[classtype][0].value as TCMSGradeCluster,
    }));
  }, [updateDetailFormState]);

  //
  // cache
  //
  const leftSideFormItems = useMemo(() => [
    {
      id: 'achievement1__no',
      label: '순번',
      Component: (
        <Input
          id="achievement1__no"
          className="editor"
          value={no}
          onChange={onChangeInput} />
      ),
    },
    {
      id: 'achievement1__title',
      label: '성취기준(대) 제목',
      Component: (
        <Input
          id="achievement1__title"
          className="editor"
          value={title}
          onChange={onChangeInput} />
      ),
    },
  ], [
    no, title,
    onChangeInput,
  ]);

  const rightSideFormItems = useMemo(() => [
    {
      id: 'achievement1__curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="achievement1__curriculum"
          className="editor"
          placeholder="선택해주세요"
          options={mathCurriculumOptions}
          value={curriculum}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'achievement1__classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="achievement1__classtype"
          className="editor"
          placeholder="선택해주세요"
          options={cmsClassTypeOptions}
          value={classtype}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'achievement1__grade_cluster',
      label: '학년(군)',
      Component: (
        <CommonSelect
          id="achievement1__grade_cluster"
          className="editor"
          placeholder="선택해주세요"
          options={classtype ? cmsGradeClusterOptions[classtype] : []}
          value={grade_cluster}
          onChange={onChangeSelect} />
      ),
    },
  ], [
    curriculum, classtype, grade_cluster,
    onChangeSelect, onChangeClassType,
  ]);

  return (<>
    <Accordion 
      className="MathAchievement1"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem 
        className="MathAchievement1-accordionItem"
        value="achievement1">
        <AccordionTrigger
          className="trigger"
          isHideChevronIcon>
          성취기준(대)
          <LuChevronDown className={cn(
            'icon',
            accordionValue ? 'open' : ''
          )} />
        </AccordionTrigger>

        <AccordionContent className="formBody">
          <div className="formBody-leftSide">
            {leftSideFormItems.map(item => {
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

          <div className="formBody-rightSide">
            {rightSideFormItems.map(item => {
              const {
                id,
                label,
                Component
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div className="MathAchievement1-achievement2Wrapper">
      {detailFormState.achievement2_set.map((achievement2, indexOfAchievement2) => {
        return (
          <MathAchievement2
            key={`${detailFormState.achievement2_set.length}-${indexOfAchievement2}`}
            indexOfAchievement2={indexOfAchievement2}
            achievement2={achievement2} />
        );
      })}
    </div>
  </>);
}

const MathAchievement1 = memo(_MathAchievement1);
export default MathAchievement1;
