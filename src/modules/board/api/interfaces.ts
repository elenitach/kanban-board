export enum Statuses {
  InProgress = "inProgress",
  Review = "review",
  Completed = "completed",
}

export interface Document {
  id: string;
  title: string;
  status: Statuses;
}
