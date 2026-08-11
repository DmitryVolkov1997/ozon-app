import { atomWithStorage } from "jotai/utils";

export const favoritesProductIdAtom = atomWithStorage<string[]>(
  "favoritesProductId",
  [],
);
