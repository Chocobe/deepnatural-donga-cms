// type
import { 
  simpleNoticeModalVariantMapper, 
  TSimpleNoticeModalVariant,
} from '@/components/shadcn-ui-custom/modals/SimpleNoticeModal/SimpleNoticeModal.type';
import { 
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';

type TResultNoticeModalButton = {
  text?: string;
  variant?: ButtonProps['variant'];
  onClick?: () => void;
};

type TOpenResultNoticeModalParams = {
  title: string;
  description: string;
  firstButton?: TResultNoticeModalButton;
  secondButton?: TResultNoticeModalButton;
};

export type TResultNoticeModalStoreState = {
  isOpen: boolean;
  title?: string;
  description?: string;
  variant: TSimpleNoticeModalVariant;

  firstButton?: TResultNoticeModalButton;
  secondButton?: TResultNoticeModalButton;
};

export const initialResultNoticeModalStoreState: TResultNoticeModalStoreState = {
  isOpen: false,
  title: undefined,
  description: undefined,
  variant: simpleNoticeModalVariantMapper.SUCCESS,
  firstButton: undefined,
  secondButton: undefined,
} as const;

export type TResultNoticeModalStoreAction = {
  openSuccessNoticeModal: (params: TOpenResultNoticeModalParams) => void;
  openErrorNoticeModal: (params: TOpenResultNoticeModalParams) => void;
  closeResultNoticeModal: () => void;
};

export type TResultNoticeModalStore = 
  & TResultNoticeModalStoreState
  & TResultNoticeModalStoreAction;
