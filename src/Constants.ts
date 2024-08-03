export const LOGIN_FETCHING = 'LOGIN_FETCHING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const REGISTER_FETCHING = 'REGISTER_FETCHING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_CLEAR = 'STOCK_CLEAR'

export const STOCK_EDIT_FETCHING = "STOCK_EDIT_FETCHING";
export const STOCK_EDIT_SUCCESS = "STOCK_EDIT_SUCCESS";
export const STOCK_EDIT_FAILED = "STOCK_EDIT_FAILED";


export const apiUrl = "http://localhost:8085/api/v2";
export const imageUrl = "http://localhost:8085";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";
export const TOKEN = "TOKEN";

export const LOGIN_STATUS = "LOGIN_STATUS";

export const server = {
    LOGIN_URL: `authen/login`,
    REGISTER_URL: `authen/register`,
    PRODUCT_URL: `stock/product`,
    TRANSACTION_URL: `transaction`,
    REPORT_URL: `stock/report`,
    LOGIN_PASSED: `yes`,
};

export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLEDE_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to sever pleas try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A Network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. the photo was unable to upload.";