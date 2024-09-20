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
import './TextbookList.css';

type TTextbookListProps<T = TSummarizedMetadata> = {
  searchValue: string;
  summarizedMetadataList?: T[];
  textbookItemTemplate?: Readonly<Array<{
    key: string;
    label: string;
  }>>;
  onClickItem: (metadata: T) => void;
};

function _TextbookList<T extends TSummarizedMetadata>(props: TTextbookListProps<T>) {
  const {
    searchValue,
    summarizedMetadataList,
    textbookItemTemplate,
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
    <div className="TextbookList">
      {!summarizedMetadataList?.length
        ? (
          <div className="emptyMessage">
            검색 결과가 없습니다.
          </div>
        ): summarizedMetadataList?.map((item, index) => {
          const titleTemplate = textbookItemTemplate?.find(({ key }) => key === 'title');
          const detailsTemplate = textbookItemTemplate?.filter(({ key }) => key !== 'title');

          const summary = highlightedSummaryList?.[index] ?? '';

          return (
            <div 
              key={index}
              className="resultItem"
              onClick={() => onClickItem(item)}>
              <div className="id">
                {item.metadata.id}
              </div>

              <div className="titleWrapper">
                <div className="label">
                  {titleTemplate?.label} :&nbsp;
                </div>

                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: summary,
                  }} />
              </div>

              <ul className="detailList">
                {detailsTemplate?.map(template => {
                  const {
                    key,
                    label,
                  } = template;

                  const value = item.metadata[key];

                  return (
                    <li
                      key={key}
                      className="detail">
                      <div className="inner">
                        <div className="label">
                          {label} :
                        </div>

                        <div className="value">
                          {value}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      }
    </div>
  );
}

const TextbookList = memo(_TextbookList) as typeof _TextbookList;
export default TextbookList;
