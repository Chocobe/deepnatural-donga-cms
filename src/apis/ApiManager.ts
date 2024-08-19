import * as localStorage from './localStorage/localStorage';
import * as auth from './auth/authApi';
import * as math from './math/mathApis';

/**
 * Manage all apis
 */
const ApiManager = {
  localStorage,
  auth,
  math,
};

export default ApiManager;
