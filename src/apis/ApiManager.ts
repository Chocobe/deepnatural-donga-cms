import * as localStorage from './localStorage/localStorage';
import * as auth from './auth/authApi';
import * as math from './math/mathApis';
import * as mathOCR from './mathOCR/mathOCRApi';
import * as mathTool from './mathTool/mathToolApi';

/**
 * Manage all apis
 */
const ApiManager = {
  localStorage,
  auth,
  math,
  mathOCR,
  mathTool,
};

export default ApiManager;
