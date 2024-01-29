"use client";
import {
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FC } from "react";
import { StyledPagination } from "./styled";
import { redirect } from "next/navigation";

type TableProps = {
    data: any[];
    columns: ColumnDef<any>[];
    pageCount: number;
    setPaginationPage: (page: number) => void;
    page: number;
    onRowClick?: (uid: string) => void;
};

export const Table: FC<TableProps> = ({
    data,
    columns,
    pageCount,
    page,
    setPaginationPage,
    onRowClick,
}) => {
    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount,
    });

    const handlePageChange = (
        event: ChangeEvent<unknown>,
        currentPage: number
    ) => {
        setPaginationPage(currentPage === 0 ? 1 : currentPage);
    };

    return (
        <Paper elevation={2} style={{ padding: "1rem 0px" }}>
            <MuiTable>
                <TableHead>
                    {getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {getRowModel().rows.map((row) => (
                        <TableRow
                            onClick={() =>
                                onRowClick && onRowClick(row.original.uid)
                            }
                            key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
            {!!pageCount && !!page && (
                <StyledPagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            )}
        </Paper>
    );
};
