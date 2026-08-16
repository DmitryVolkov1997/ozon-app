"use client";
import { favoritesProductIdAtom } from "@/store";
import { useSetAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { SubmitEvent, useState } from "react";

type DeleteProductButtonProps = {
  productId: string;
  action: () => Promise<void>;
};

export function DeleteProductButton({
  productId,
  action,
}: DeleteProductButtonProps) {
  const setFavorites = useSetAtom(favoritesProductIdAtom);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    try {
      await action();

      setFavorites((ids) => ids.filter((id) => id !== productId));
    } catch (error) {
      console.error("Не удалось удалить товар", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="bg-transparent" type="submit" disabled={isPending}>
        <Trash2
          className="text-red-700 hover:text-red-900 transition-colors"
          size={20}
        />
      </button>
    </form>
  );
}

export default DeleteProductButton;
