"use client";

import { Statuses } from "../../api/interfaces";
import { FC, useState } from "react";
import {
  Paper,
  CircularProgress,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/config/storeHooks";
import { FetchStatuses } from "../../store/interfaces";
import { AddDocumentTextarea } from "../AddDocumentTextarea/AddDocumentTextarea";
import { addDocument } from "../../store/documentsSlice";

interface Props {
  title: string;
  status: Statuses;
  withAddButton?: boolean;
}

export const Column: FC<Props> = ({ status, title, withAddButton }) => {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector((state) => state.documents.fetchStatus);
  const data = useAppSelector((state) => state.documents.documents);
  const [showInput, setShowInput] = useState(false);

  const onAddDocument = (title: string) => {
    dispatch(addDocument({ status, title }));
  };

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        width: 300,
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {fetchStatus === FetchStatuses.Pending && (
        <CircularProgress size={20} sx={{ margin: "0 auto" }} />
      )}
      {fetchStatus === FetchStatuses.Success && (
        <>
          {data
            .filter((item) => item.status === status)
            .map((item) => (
              <Card key={item.id} sx={{ p: 2, cursor: "pointer" }}>
                <Typography>{item.title}</Typography>
              </Card>
            ))}
          {showInput && (
            <AddDocumentTextarea
              onAddDocument={onAddDocument}
              onClose={() => setShowInput(false)}
            />
          )}

          {withAddButton && (
            <Button
              fullWidth
              onClick={() => setShowInput(true)}
              disabled={showInput}
            >
              Добавить
            </Button>
          )}
        </>
      )}
    </Paper>
  );
};
