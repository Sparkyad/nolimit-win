import { PendingMarketStatusType } from "../components/admin-pendint-stat-card";

interface AdminPendingListItem {
  img: string;
  title: string;
  endDate: string;
  status: PendingMarketStatusType;
  reason: string;
}

export const AdminPendingListData: AdminPendingListItem[] = [
  {
    img: "/card-images/putin.jfif",
    title: "Russia x Ukraine ceasefire in 2025?",
    endDate: "Jan 15, 2025 – 12:00 UTC",
    reason: "Failed",
    status: "failed",
  },
  {
    img: "/card-images/ilia.jfif",
    title: "Will Ilia win against Islam",
    endDate: "Jan 10, 2025 – 23:59 UTC",
    reason: "Pending",
    status: "pending",
  },
  {
    img: "/card-images/weekend.jpeg",
    title: "Top 5 Spotify Artist",
    endDate: "Jan 14, 2025 – 18:00 UTC",
    reason: "Needs Review",
    status: "review",
  },
];
