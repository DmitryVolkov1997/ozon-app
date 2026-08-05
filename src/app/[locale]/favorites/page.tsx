import { NO_INDEX_PAGE } from "@/constants";
import type { Metadata } from "next";
import Favorites from "./Favorites";

export const metadata: Metadata = {
  title: "Favorites product",
  ...NO_INDEX_PAGE,
};

export default function FavoritesPage() {
  return <Favorites />;
}
