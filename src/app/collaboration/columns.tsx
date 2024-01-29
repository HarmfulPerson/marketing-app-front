import { Chip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: "topic",
        header: "Topic",
    },
    {
        accessorKey: "durationType",
        header: "Type",
    },
    {
        accessorKey: "startDate",
        header: "Start",
    },
    {
        accessorKey: "isPrivate",
        header: "Private",
        cell: (row: any) => {
            return (
                <Chip
                    label={row.getValue() ? "YES" : "NO"}
                    size="small"
                    color={row.getValue() ? "primary" : "default"}
                />
            );
        },
    },
];
