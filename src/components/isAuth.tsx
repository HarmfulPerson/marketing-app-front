"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { decodeToken, isDateInThePast } from "@/utils/utils";
import PrimarySearchAppBar from "./appBar";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) return redirect("/login");

            const decodedToken = decodeToken(token);

            if (!decodedToken) {
                return redirect("/login");
            }

            if (isDateInThePast(decodedToken.exp)) {
                return redirect("/login");
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
