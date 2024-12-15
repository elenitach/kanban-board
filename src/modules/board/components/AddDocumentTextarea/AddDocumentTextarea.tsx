import { ChangeEvent, FC, useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { TextField } from "@mui/material";

interface Props {
  onAddDocument: (value: string) => void;
  onClose: () => void;
}

export const AddDocumentTextarea: FC<Props> = ({ onAddDocument, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  useClickOutside(ref, () => onClose());

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      multiline
      ref={ref}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (value.trim()) {
            onAddDocument(value);
          }
          setValue("");
        }
      }}
      value={value}
      autoFocus
    />
  );
};
