import { REFRESH_TOKEN_PERIOD } from "@/consts";
import { deauthTokens, setTokens } from "@/utils/utils";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
                `http://localhost:4000/api/v1${url}`,
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

export const useRefreshToken = (
    url: string,
    options?: AxiosRequestConfig,
    functionName?: string
) => {
    const fetcher = async () => {
        try {
            const response: AxiosResponse = await axios(
                `http://localhost:4000/api/v1${url}`,
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

    const { data, error } = useSWR(`/api/v1${url}`, fetcher, {
        refreshInterval: timeRemaining,
        onSuccess: handleSuccessRefreshToken,
        onError: (error) => {
            handleError(error);
            window.location.href = "/login";
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

const handleSuccessRefreshToken = (data: AxiosResponse) => {
    localStorage.setItem("lastTokenFetch", new Date().getTime().toString());
    setTokens(data.data);
};

const handleError = (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
        deauthTokens();
    }
};
