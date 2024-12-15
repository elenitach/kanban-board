"use client";

import { FC, useEffect } from "react";
import { Stack } from "@mui/material";
import { useAppDispatch } from "@/config/storeHooks";
import { fetchDocuments } from "../../store/documentsSlice";
import { Column } from "../Column/Column";
import { Statuses } from "../../api/interfaces";

export const Board: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <Stack direction="row" gap={6} p={4} justifyContent="center">
      <Column withAddButton status={Statuses.InProgress} title="В работе" />
      <Column status={Statuses.Review} title="На проверке" />
      <Column status={Statuses.Completed} title="Завершено" />
    </Stack>
  );
};
