import { Typography, Card } from "@mui/material";
import { Document } from "../../api/interfaces";
import { FC, Ref } from "react";
import { useDrag } from "react-dnd";
import { DnDItemTypes } from "@/config/dndTypes";

interface Props {
  document: Document;
  type: DnDItemTypes;
}

export const DocumentCard: FC<Props> = ({ document, type }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type,
      item: { id: document.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div ref={dragRef as unknown as Ref<HTMLDivElement>}>
      {!isDragging && (
        <Card key={document.id} sx={{ p: 2, cursor: "pointer" }}>
          <Typography>{document.title}</Typography>
        </Card>
      )}
    </div>
  );
};
