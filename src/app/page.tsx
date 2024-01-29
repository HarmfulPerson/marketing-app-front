"use client";

import isAuth from "@/components/isAuth";
import { withRoles } from "@/components/withRoles";

function Home() {
    return <p>xd</p>;
}

export default isAuth(Home);
