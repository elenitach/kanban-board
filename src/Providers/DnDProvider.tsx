
"use client";

import { ReactNode, FC } from "react";
import { DndProvider as DnDProviderBase } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {
  children: ReactNode;
}

export const DnDProvider: FC<Props> = ({ children }) => {
  return <DnDProviderBase backend={HTML5Backend} >{children}</DnDProviderBase>;
};