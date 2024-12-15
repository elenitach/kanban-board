import { DnDItemTypes } from "@/config/dndTypes";
import { Statuses } from "../api/interfaces";

export const getAcceptedCardDnDTypes = (status: Statuses) => {
  switch (status) {
    case Statuses.InProgress:
      return [DnDItemTypes.CardInReview];
    case Statuses.Review:
      return [DnDItemTypes.CardInProgress];
    default:
      return [DnDItemTypes.CardInReview];
  }
};
