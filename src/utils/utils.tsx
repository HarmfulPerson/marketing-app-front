import jwt from "jsonwebtoken";
import { UserLoginData, VerifiedTokenPayload } from "./types";
import { ROLES } from "@/consts";

export const isDateInThePast = (date: Date): boolean => {
    const currentTime = new Date().getTime();
    const dateToCheck = new Date(date).getTime();

    return currentTime > dateToCheck;
};

export const decodeToken = (token: string): VerifiedTokenPayload => {
    const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as unknown as VerifiedTokenPayload;

    return decodedToken;
};

export const setTokens = (
    loginData: UserLoginData,
    isFromFirstLogin: boolean = false
): void => {
    localStorage.setItem("token", loginData.tokens.token);
    localStorage.setItem("refreshToken", loginData.tokens.refreshToken);
    isFromFirstLogin &&
        localStorage.setItem("userData", JSON.stringify(loginData.userData));
};

export const deauthTokens = () => {
    if (typeof window === "undefined") return null;
    localStorage.clear();
};

export const getRoleFromLocalStorage = (): keyof typeof ROLES | null => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("userData") || "{}")
        ?.role as keyof typeof ROLES;
};
