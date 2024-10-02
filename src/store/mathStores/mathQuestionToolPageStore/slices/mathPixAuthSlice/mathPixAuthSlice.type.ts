// type
import { 
  TProduceMathPixAppTokenApiResponse,
  TRetrieveMathPixAppKeyApiResponse,
} from '@/apis/mathOCR/mathOCRApi.type';

export type TMathPixAuthSliceState = {
  appKeyInfo: {
    app_id?: string;
    app_key?: string;
  };

  appTokenInfo: {
    app_token?: string;
    app_token_expires_at?: string;
  };
};

export const initialMathPixAuthSliceState: TMathPixAuthSliceState = {
  appKeyInfo: {
    app_id: undefined,
    app_key: undefined,
  },

  appTokenInfo: {
    app_token: undefined,
    app_token_expires_at: undefined,
  },
};

export type TMathPixAuthSliceAction = {
  resetMathPixAuthSlice_action: () => void;

  setMathPixAppKeyInfo_action: (params: TRetrieveMathPixAppKeyApiResponse) => void;

  setMathPixTokenInfo_action: (params: TProduceMathPixAppTokenApiResponse) => void;
};

export type TMathPixAuthSlice = {
  mathPixAuth: {
    state: TMathPixAuthSliceState;
    action: TMathPixAuthSliceAction;
  };
};
