import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export type VerifiedTokenPayload = {
    uid: string;
    email: string;
    exp: Date;
};

export type OwnAxiosResponse<T = any> = {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosRequestHeaders;
    config: AxiosRequestConfig;
    request?: any;
};

export type GetPaginatedResponse<T> = {
    data: {
        count: number;
        rows: Array<T>;
    };
};

export type NotificationTypes = "Success" | "Error";

export type UserLoginData = {
    tokens: {
        token: string;
        refreshToken: string;
    };
    userData: {
        email: string;
        role: string;
        uid: string;
    };
};
