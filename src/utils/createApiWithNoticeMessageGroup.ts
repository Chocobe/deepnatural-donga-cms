// store
import useLoadingModalStore from '@/store/modalStores/loadingModalStore/loadingModalStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// ui
import openSonner from '@/components/shadcn-ui/ui/Sonner/openSonner';
// type
import { 
  TNoticeMessageGroup,
} from '@/utils/noticeMessageGroupFactory';

const createApiWithNoticeMessageGroup = <TResponse, TParams = void>(hofParams: {
  apiFunction: (
    params: TParams,
  ) => Promise<TResponse>;
  noticeMessageGroup: TNoticeMessageGroup;
}) => {
  const {
    apiFunction,
    noticeMessageGroup,
  } = hofParams;

  const self = (
    params: TParams
  ) => apiFunction(params);

  self.callWithNoticeMessageGroup = async (
    params: TParams,
    options?: {
      loadingMessage?: {
        isDisabled?: boolean;
        params?: Array<any>;
      };
      errorMessage?: {
        isDisabled?: boolean;
        params?: Array<any>;
      };
      successMessage?: {
        isDisabled?: boolean;
        params?: Array<any>;
      };
      successSonner?: {
        isDisabled?: boolean;
        params: Array<any>;
      };
    }
  ) => {
    const {
      loadingMessage: loadingMessageOptions,
      errorMessage: errorMessageOptions,
      successMessage: successMessageOptions,
      successSonner: successSonnerOptions,
    } = options ?? {};

    const {
      loadingMessage,
      successMessage,
      successSonner,
      errorMessage,
    } = noticeMessageGroup;

    const {
      openLoadingModal,
      closeLoadingModal,
    } = useLoadingModalStore.getState();

    const {
      openSuccessNoticeModal,
      openErrorNoticeModal,
    } = useResultNoticeModalStore.getState();

    try {
      !loadingMessageOptions?.isDisabled 
        && loadingMessage 
        && openLoadingModal(
          loadingMessage(...(loadingMessageOptions?.params ?? [])).message
        );

      const response = await self(params);

      !successMessageOptions?.isDisabled 
        && successMessage 
        && openSuccessNoticeModal({
          ...successMessage(...(successMessageOptions?.params ?? [])),
          firstButton: {
            text: '확인',
            variant: 'default',
          },
        });

      !successSonnerOptions?.isDisabled
        && successSonner
        && openSonner(successSonner());

      return response;
    } catch(error: any) {
      !errorMessageOptions?.isDisabled 
        && openErrorNoticeModal({
          ...errorMessage(...(errorMessageOptions?.params ?? [])),
          firstButton: {
            text: '확인',
            variant: 'default',
          },
        });
    } finally {
      !loadingMessageOptions?.isDisabled 
        && closeLoadingModal();
    }
  };

  return self;
};

export default createApiWithNoticeMessageGroup;
