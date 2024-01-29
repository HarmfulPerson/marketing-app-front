"use client";

import isAuth from "@/components/isAuth";
import { withRoles } from "@/components/withRoles";
import { routingDisplayData } from "@/consts";

function User() {
    return <p>lool</p>;
}

export default withRoles(isAuth(User), routingDisplayData.user.name);
