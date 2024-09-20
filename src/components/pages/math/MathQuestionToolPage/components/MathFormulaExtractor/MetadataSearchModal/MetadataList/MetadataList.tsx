// react
import {
  useMemo,
  memo,
} from 'react';
// type
import { 
  TSummarizedMetadata,
} from '../../MathFormulaAccordions/mathFormulaAccordions.type';
// style
import './MetadataList.css';

type TMetadataListProps<T = TSummarizedMetadata> = {
  searchValue: string;
  summarizedMetadataList?: T[];
  onClickItem: (metadata: T) => void;
};

function _MetadataList<T extends TSummarizedMetadata>(props: TMetadataListProps<T>) {
  const {
    searchValue,
    summarizedMetadataList,
    onClickItem,
  } = props;

  //
  // cache
  //
  const highlightedSummaryList = useMemo(() => {
    if (!summarizedMetadataList) {
      return null;
    }

    const regExp = new RegExp(searchValue, 'g');

    return summarizedMetadataList.map(({ summary }) => {
      return summary.replace(regExp, `<span class="searchValue">${searchValue}</span>`);
    });
  }, [searchValue, summarizedMetadataList]);

  return (
    <div className="MetadataList">
      {!summarizedMetadataList?.length
        ? (
          <div className="emptyMessage">
            검색 결과가 없습니다.
          </div>
        ): summarizedMetadataList.map((item, index) => {
          const {
            metadata,
          } = item;

          const summary = highlightedSummaryList?.[index] ?? '';

          return (
            <li
              className="resultItem"
              key={index}
              onClick={() => onClickItem(item)}>
              <div className="id">
                {metadata.id}
              </div>

              <div 
                className="value"
                dangerouslySetInnerHTML={{
                  __html: summary,
                }} />
            </li>
          );
        })
      }
    </div>
  );
}

const MetadataList = memo(_MetadataList) as typeof _MetadataList;
export default MetadataList;
