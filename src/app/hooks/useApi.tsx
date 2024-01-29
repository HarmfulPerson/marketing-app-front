import { NOTIFICATION_TYPE, REFRESH_TOKEN_PERIOD } from "@/consts";
import { addNotification } from "@/lib/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deauthTokens, setTokens } from "@/utils/utils";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { httpStatusDescriptions } from "@/consts/HttpResponseCodes";
import { AppDispatch } from "@/lib/store";
import { OwnAxiosResponse } from "@/utils/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useApi = (
    url: string,
    options?: AxiosRequestConfig,
    functionName?: string
) => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [error, setError] = useState<any | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setData(null);
        try {
            const response: AxiosResponse = await axios(
                `${process.env.API_URL}${url}`,
                options
            );
            setData(response.data);

            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (options?.method === "GET") fetchData();
    }, []);

    return { data, isLoading, error, [functionName || "fetchData"]: fetchData };
};
function isAxiosError<ResponseType>(
    error: unknown
): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
}

type ApiError = {
    message: string;
    rawErrors: string[];
    stack: string;
    success: boolean;
};

export const useAuthApi = <T,>(
    url: string,
    options?: AxiosRequestConfig,
    functionName?: string
) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const fetcher = async () => {
        try {
            const response: OwnAxiosResponse<T> = await axios(
                `${process.env.API_URL}${url}`,
                {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    const { data, error } = useSWR(`/api/v1${url}`, fetcher, {
        shouldRetryOnError: false,
        onError: (err) => handleError(err, router, dispatch),
        onSuccess: () => {
            !data && handleSuccessfullFetch(dispatch);
        },
    });
    const isLoading = !data && !error;

    return {
        data,
        isLoading,
        error,
        [functionName || "fetchData"]: fetcher,
    };
};

export const useRefreshToken = (
    url: string,
    options?: AxiosRequestConfig,
    functionName?: string
) => {
    const router = useRouter();
    const fetcher = async () => {
        try {
            const response: AxiosResponse = await axios(
                `${process.env.API_URL}${url}`,
                {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    };
    if (
        !localStorage.getItem("lastTokenFetch") &&
        localStorage.getItem("token")
    )
        localStorage.setItem("lastTokenFetch", new Date().getTime().toString());

    const lastFetchTimestamp = parseInt(
        localStorage.getItem("lastTokenFetch") ?? "0",
        10
    );
    const timeRemaining = lastFetchTimestamp
        ? REFRESH_TOKEN_PERIOD - (new Date().getTime() - lastFetchTimestamp)
        : REFRESH_TOKEN_PERIOD;
    const { data, error, isLoading } = useSWR(`/api/v1${url}`, fetcher, {
        refreshInterval: timeRemaining,
        onSuccess: handleSuccessRefreshToken,
        onError: (error) => {
            handleError(error, router);
        },
    });

    return {
        data,
        isLoading,
        error,
        [functionName || "fetchData"]: fetcher,
    };
};

const handleSuccessRefreshToken = (data: AxiosResponse) => {
    localStorage.setItem("lastTokenFetch", new Date().getTime().toString());
    setTokens(data.data);
};

const handleSuccessfullFetch = (updateStore: AppDispatch) => {
    updateStore(
        addNotification({
            type: NOTIFICATION_TYPE.success,
            name: "Success",
            message: "Data fetched successfully",
        })
    );
};

const handleError = (
    error: AxiosError,
    router: AppRouterInstance,
    updateStore?: AppDispatch
) => {
    if (error.response && error.response.status === 401) {
        router.push("/login");
        deauthTokens();
    }
    if (isAxiosError<ApiError> && updateStore)
        updateStore(
            addNotification({
                type: NOTIFICATION_TYPE.error,
                name:
                    httpStatusDescriptions[error.response?.status || 0] ||
                    "Error",
                message: (error.response?.data as ApiError).message,
            })
        );
};
