import { Document, Statuses } from "./interfaces";

export const getDocuments = async (): Promise<Document[]> => {
  await new Promise((res) => setTimeout(res, 2000));
  return [
    { id: "1", status: Statuses.InProgress, title: "Документ 1" },
    { id: "2", status: Statuses.Completed, title: "Документ 2" },
    { id: "3", status: Statuses.InProgress, title: "Документ 3" },
    { id: "4", status: Statuses.Review, title: "Документ 4" },
    { id: "5", status: Statuses.InProgress, title: "Документ 5" },
    { id: "6", status: Statuses.Review, title: "Документ 6" },
    { id: "7", status: Statuses.Completed, title: "Документ 7" },
    { id: "8", status: Statuses.Completed, title: "Документ 8" },
  ];
};
