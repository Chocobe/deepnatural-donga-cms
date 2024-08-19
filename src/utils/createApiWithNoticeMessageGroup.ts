// store
import useLoadingModalStore from '@/store/loadingModalStore/loadingModalStore';
import useResultNoticeModalStore from '@/store/resultNoticeModalStore/resultNoticeModalStore';
// type
import { 
  TNoticeMessageGroup,
} from '@/utils/noticeMessageGroupFactory';

const createApiWithNoticeMessageGroup = <TResponse, TParams = void>(focParams: {
  apiFunction: (
    params: TParams,
  ) => Promise<TResponse>;
  noticeMessageGroup: TNoticeMessageGroup;
}) => {
  const {
    apiFunction,
    noticeMessageGroup,
  } = focParams;

  const self = (
    params: TParams
  ) => apiFunction(params);

  self.callWithNoticeMessageGroup = async (
    params: TParams,
    options?: {
      isDisabledLoadingMessage?: boolean;
      isDisabledSuccessMessage?: boolean;
      isDisabledErrorMessage?: boolean;
    }
  ) => {
    const {
      isDisabledLoadingMessage,
      isDisabledSuccessMessage,
      isDisabledErrorMessage,
    } = options ?? {};

    const {
      loadingMessage,
      successMessage,
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
      !isDisabledLoadingMessage && loadingMessage && openLoadingModal(
        loadingMessage().message
      );

      const response = await self(params);

      !isDisabledSuccessMessage && successMessage && openSuccessNoticeModal({
        ...successMessage(),
        firstButton: {
          text: '확인',
          variant: 'default',
        },
      });

      return response;
    } catch(error: any) {
      !isDisabledErrorMessage && openErrorNoticeModal({
        ...errorMessage(),
        firstButton: {
          text: '확인',
          variant: 'default',
        },
      });
    } finally {
      !isDisabledLoadingMessage && closeLoadingModal();
    }
  };

  return self;
};

export default createApiWithNoticeMessageGroup;
