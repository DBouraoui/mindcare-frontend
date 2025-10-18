import {useMutation, useQueryClient} from "@tanstack/react-query";
import { removePraticienFavoriteById} from "@/api/Praticien";

export default function MutationRemoveFavoritePro(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: string) => removePraticienFavoriteById(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["praticienFavoris"] });
        },
    });
}