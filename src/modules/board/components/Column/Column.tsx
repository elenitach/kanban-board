"use client";

import { Document, Statuses } from "../../api/interfaces";
import { FC, useState, Ref } from "react";
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
import { addDocument, changeStatus } from "../../store/documentsSlice";
import { DocumentCard } from "../DocumentCard/DocumentCard";
import { getCardDndType } from "../../helpers/getCardDndType";
import { useDrop } from "react-dnd";
import { getAcceptedCardDnDTypes } from "../../helpers/getAcceptedCardDnDTypes";
import { blue } from "@mui/material/colors";

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

  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: getAcceptedCardDnDTypes(status),
    drop: (item: Document) => {
      dispatch(changeStatus({ id: item.id, status }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const onAddDocument = (title: string) => {
    dispatch(addDocument({ status, title }));
  };

  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 4,
        width: 300,
        background: isOver && canDrop ? blue[100] : "white",
      }}
      ref={dropRef as unknown as Ref<HTMLDivElement>}
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
              <DocumentCard
                key={item.id}
                document={item}
                type={getCardDndType(status)}
              />
            ))}
          {isOver && canDrop && <Card sx={{ p: 4, opacity: 0.5 }} />}
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
