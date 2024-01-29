"use client";
import isAuth from "@/components/isAuth";
import { withRoles } from "@/components/withRoles";
import { routingDisplayData } from "@/consts";
import { useRouter } from "next/router";

function OneUid({ params }: { params: { uid: string } }) {
    const { uid } = params;
    return <p>Post: {uid}</p>;
}

export default withRoles(isAuth(OneUid), routingDisplayData.collaboration.name);
