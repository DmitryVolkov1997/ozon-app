"use client";
import { SkeletonLoader } from "@/components/ui/SceletonLoader";
import dynamic from "next/dynamic";

export const DynamicFavorites = dynamic(() => import("./Favorites"), {
  ssr: false,
  loading: () => <SkeletonLoader count={1} />,
});
