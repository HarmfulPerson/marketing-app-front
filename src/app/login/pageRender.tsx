"use client";

import InputButton from "@/components/inputButton";
import SubmitButton from "@/components/submitButton";
import { useState } from "react";
import Box from "@mui/material/Box";

export default function LoginPageRender(props: any) {
    const {
        handleSubmit,
        email,
        password,
        handleEmailChange,
        handlePasswordChange,
    } = props;
    return (
        <div className="flex items-center justify-center h-screen">
            <Box className="px-8 py-4 shadow rounded-md flex flex-col gap-2">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <InputButton
                        type="email"
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <br />
                    <InputButton
                        type="password"
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <br />
                    <SubmitButton className="ml-auto " buttonText="Log in" />
                </form>
            </Box>
        </div>
    );
}
