import { useMutation } from "@tanstack/react-query";
import { createFavoritePraticien } from "@/api/Praticien";

export default function useSaveFavoritePro() {
    return useMutation({
        mutationFn: (proId: string) => createFavoritePraticien(proId),
    });
}
