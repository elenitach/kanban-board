import { DnDItemTypes } from "@/config/dndTypes";
import { Statuses } from "../api/interfaces";

export const getCardDndType = (status: Statuses) => {
  switch (status) {
    case Statuses.InProgress:
      return DnDItemTypes.CardInProgress;
    case Statuses.Review:
      return DnDItemTypes.CardInReview;
    default:
      return DnDItemTypes.CardCompleted;
  }
};
