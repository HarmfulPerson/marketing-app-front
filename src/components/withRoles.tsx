"use client";
import { NOTIFICATION_TYPE, RBAC, ROLES } from "@/consts";
import { httpStatusDescriptions } from "@/consts/HttpResponseCodes";
import { addNotification } from "@/lib/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deauthTokens, getRoleFromLocalStorage } from "@/utils/utils";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

const hasRequiredPermissions = (
    role: keyof typeof ROLES,
    requiredPermission: string
): boolean => RBAC[role].includes(requiredPermission);

export function withRoles(Component: any, permission: string) {
    return function WithRolesWrapper(props: any) {
        const dispatch = useAppDispatch();
        const hasPermission = useRef<boolean>(false);
        const role = useRef<any>(null);

        useEffect(() => {
            role.current = getRoleFromLocalStorage();
            if (!role) {
                deauthTokens();
                return redirect("/login");
            }
            hasPermission.current = hasRequiredPermissions(
                role.current,
                permission
            );
        }, []);

        if (hasPermission) {
            return <Component {...props} />;
        } else {
            dispatch(
                addNotification({
                    type: NOTIFICATION_TYPE.error,
                    name: httpStatusDescriptions["403"],
                    message: `This page is forbidden for ${role.current}`,
                })
            );
            return redirect("/");
        }
    };
}
