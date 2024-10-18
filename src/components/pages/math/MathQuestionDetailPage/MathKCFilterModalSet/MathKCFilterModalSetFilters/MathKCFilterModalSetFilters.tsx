// react
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import ComboBox from '@/components/shadcn-ui-custom/ComboBox/ComboBox';
// type
import { 
  TMathAchievement1Model,
  TMathAchievement2Model,
  TMathAchievement3Model,
} from '@/apis/models/mathModel.type';
import { 
  TComboBoxOptionItem,
} from '@/components/shadcn-ui-custom/ComboBox/ComboBox.type';
import { 
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKCFilterModalSetFilters.css';
import { 
  TRetrieveMathKnowledgeConceptsApiResponse,
} from '@/apis/math/mathApi.type';

type TMathKCFilterModalSetFiltersProps = {
  retrieveKCList: (
    achievement3: TMathAchievement3Model | null
  ) => Promise<TRetrieveMathKnowledgeConceptsApiResponse>
};

function _MathKCFilterModalSetFilters(props: TMathKCFilterModalSetFiltersProps) {
  const {
    retrieveKCList,
  } = props;

  //
  // ref
  //
  const $achievement1Ref = useRef<HTMLButtonElement | null>(null);
  const $achievement2Ref = useRef<HTMLButtonElement | null>(null);
  const $achievement3Ref = useRef<HTMLButtonElement | null>(null);

  //
  // state
  //
  const [achievement1, setAchievement1] = useState<TMathAchievement1Model | null>(null);
  const [achievement2, setAchievement2] = useState<TMathAchievement2Model | null>(null);
  const [achievement3, setAchievement3] = useState<TMathAchievement3Model | null>(null);

  const [achievement1Options, setAchievement1Options] = useState<
    TComboBoxOptionItem<TMathAchievement1Model>[]
  >([]);
  const [achievement2Options, setAchievement2Options] = useState<
    TComboBoxOptionItem<TMathAchievement2Model>[]
  >([]);
  const [achievement3Options, setAchievement3Options] = useState<
    TComboBoxOptionItem<TMathAchievement3Model>[]
  >([]);

  //
  // callback
  //
  const retrieveMathAchievement1List = useCallback(async() => {
    const params: TRetrieveMathAchievementsApiRequestParams = {
      searchParams: {
        // 
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathAchievementsApi
      .callWithNoticeMessageGroup(params);

    const achievement1Options = response
      ?.data
      ?.results
      .map(data => ({
        id: data.id,
        text: data.title,
        data,
      })) ?? [];

    setAchievement1Options(achievement1Options);
    setAchievement2Options([]);
    setAchievement3Options([]);

    setAchievement1(null);
    setAchievement2(null);
    setAchievement3(null);
  }, []);

  const onChangeAchievement1 = useCallback((
    item: TComboBoxOptionItem<TMathAchievement1Model> | null
  ) => {
    const achievement1 = item?.data || null;

    const achievement2Options = achievement1
      ?.achievement2_set
      .map(data => ({
        id: data.id,
        text: data.title,
        data,
      })) ?? [];

    setAchievement1(achievement1);
    setAchievement2(null);
    setAchievement3(null);

    setAchievement2Options(achievement2Options);
    setAchievement3Options([]);

    setTimeout(() => {
      $achievement2Ref.current?.click();
    });
  }, []);

  const onChangeAchievement2 = useCallback((
    item: TComboBoxOptionItem<TMathAchievement2Model> | null
  ) => {
    const achievement2 = item?.data || null;

    const achievement3Options = achievement2
      ?.achievement3_set
      .map(data => ({
        id: data.id,
        text: data.title,
        data,
      })) ?? [];

    setAchievement2(achievement2);
    setAchievement3(null);

    setAchievement3Options(achievement3Options);

    setTimeout(() => {
      $achievement3Ref.current?.click();
    });
  }, []);

  const onChangeAchievement3 = useCallback(async (
    item: TComboBoxOptionItem<TMathAchievement3Model> | null
  ) => {
    const achievement3 = item?.data || null;
    setAchievement3(achievement3);

    retrieveKCList(achievement3);
  }, [retrieveKCList]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      label: '성취기준(대)',
      Component: (
        <ComboBox<TMathAchievement1Model>
          ref={$achievement1Ref}
          options={achievement1Options}
          value={achievement1}
          onChange={onChangeAchievement1} />
      ),
    },
    {
      label: '성취기준(중)',
      Component: (
        <ComboBox<TMathAchievement2Model>
          ref={$achievement2Ref}
          options={achievement2Options}
          value={achievement2}
          onChange={onChangeAchievement2} />
      ),
    },
    {
      label: '성취기준',
      Component: (
        <ComboBox<TMathAchievement3Model>
          ref={$achievement3Ref}
          options={achievement3Options}
          value={achievement3}
          onChange={onChangeAchievement3} />
      ),
    },
  ], [
    achievement1,
    achievement2,
    achievement3,
    achievement1Options,
    achievement2Options,
    achievement3Options,
    onChangeAchievement1,
    onChangeAchievement2,
    onChangeAchievement3,
  ]);

  //
  // effect
  //
  useEffect(() => {
    retrieveMathAchievement1List();
  }, [retrieveMathAchievement1List]);

  return (
    <div className="MathKCFilterModalSetFilters">
      {filterItems.map(item => {
        const {
          label,
          Component,
        } = item;

        return (
          <div
            key={`MathKCFilterModalSetFilters-${label}`}
            className="MathKCFilterModalSetFilters-filter">
            <label className="label">
              {label}
            </label>

            {Component}
          </div>
        );
      })}
    </div>
  );
}

const MathKCFilterModalSetFilters = memo(_MathKCFilterModalSetFilters);
export default MathKCFilterModalSetFilters;
