"use client";

import { useAuthApi } from "../hooks/useApi";
import { useState } from "react";
import { GetPaginatedResponse } from "@/utils/types";
import { Collaboration } from "./types";
import { columns } from "./columns";
import { Table } from "@/components/Table/table";
import { Box } from "@mui/material";
import { ROWS_PER_PAGE, routingDisplayData } from "@/consts";
import isAuth from "@/components/isAuth";
import { withRoles } from "@/components/withRoles";
import { useRouter } from "next/navigation";

const URL_ASSET = "collaboration";
function CollaborationPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const params = new URLSearchParams({
        rowsPerPage: `${ROWS_PER_PAGE}`,
        page: `${currentPage}`,
    });
    const { data, error, isLoading } = useAuthApi<
        GetPaginatedResponse<Collaboration>
    >(`/${URL_ASSET}?${params.toString()}`, {
        method: "GET",
    });

    const handleClickRow = (uid: string) => {
        router.push(`${URL_ASSET}/${uid}`);
    };

    return (
        <Box padding={6}>
            {error && <p>Cannot load data.</p>}
            {data && (
                <Table
                    data={data.data.rows}
                    columns={columns}
                    pageCount={Math.ceil(data.data.count / ROWS_PER_PAGE)}
                    setPaginationPage={setCurrentPage}
                    page={currentPage}
                    onRowClick={handleClickRow}
                />
            )}
        </Box>
    );
}

export default withRoles(
    isAuth(CollaborationPage),
    routingDisplayData.collaboration.name
);
