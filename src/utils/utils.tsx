import jwt from "jsonwebtoken";
import { VerifiedTokenPayload } from "./types";

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

export const setTokens = (tokens: {
    token: string;
    refreshToken: string;
}): void => {
    const decodedToken = decodeToken(tokens.token);
    localStorage.setItem("token", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("userData", JSON.stringify(decodedToken));
};

export const deauthTokens = () => {
    localStorage.clear();
};
