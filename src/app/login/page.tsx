"use client";

import { useEffect, useState } from "react";
import LoginPageRender from "./pageRender";
import { useApi } from "../hooks/useApi";
import { setTokens } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const { push } = useRouter();
    const [password, setPassword] = useState("");
    const { data, isLoading, error, login } = useApi(
        "/auth/signIn",
        {
            method: "POST",
            data: { email, password },
        },
        "login"
    );
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await login();
        if (response) {
            setTokens(response.data, true);
            push("/");
        }
    };

    return (
        <>
            <LoginPageRender
                email={email}
                password={password}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}
