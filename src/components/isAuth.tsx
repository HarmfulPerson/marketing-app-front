"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { deauthTokens, decodeToken, isDateInThePast } from "@/utils/utils";
import PrimarySearchAppBar from "./appBar";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const handleDeauth = () => {
            deauthTokens();
            return redirect("/login");
        };
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                return handleDeauth();
            }
            let decodedToken;
            try {
                decodedToken = decodeToken(token);
            } catch (err) {
                return handleDeauth();
            }

            if (!decodedToken) {
                return handleDeauth();
            }

            if (isDateInThePast(decodedToken.exp)) {
                return handleDeauth();
            }
        }, []);

        return (
            <>
                <PrimarySearchAppBar />
                <Component {...props} />
            </>
        );
    };
}
