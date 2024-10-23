// react
import { 
  useCallback,
  memo, 
} from 'react';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MetadataAccordionItemTemplate from '../MetadataAccordionItemTemplate/MetadataAccordionItemTemplate';
// type
import { 
  sourceMetadataTemplate,
} from '../mathFormulaAccordions.type';
import { 
  TRetrieveMathToolSourcesApiRequestParams, 
  TRetrieveMathToolSourcesApiResponse,
} from '@/apis/mathTool/mathToolApi.type';

type TSourceMetadataAccordionItemProps = {
  accordionValue: string;
  isTarget: boolean;
}

function _SourceMetadataAccordionItem(props: TSourceMetadataAccordionItemProps) {
  const {
    accordionValue,
    isTarget,
  } = props;

  //
  // callback
  //
  const onSearch = useCallback(async (
    searchValue: string,
    page: number = 1
  ) => {
    const params: TRetrieveMathToolSourcesApiRequestParams = {
      searchParams: {
        name: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolSourcesApi
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolSourcesApiResponse;
  }, []);

  return (
    <MetadataAccordionItemTemplate<TRetrieveMathToolSourcesApiResponse>
      accordionValue={accordionValue}
      isTarget={isTarget}
      metadataTemplate={sourceMetadataTemplate}
      onSearch={onSearch} />
  );
}

const SourceMetadataAccordionItem = memo(_SourceMetadataAccordionItem) as typeof _SourceMetadataAccordionItem;
export default SourceMetadataAccordionItem;
