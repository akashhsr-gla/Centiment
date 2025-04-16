// utils/apiPaths.js
export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
        UPLOAD_INCOME: "/api/v1/income/upload"
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
        UPLOAD_EXPENSE: "/api/v1/expense/upload"
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
    PREDICTIONS: {
        GET_PREDICTIONS: "/api/v1/predictions"
    },
    ACCOUNTS: {
        GET_SUMMARY: "/api/v1/accounts/summary"
    }
};
