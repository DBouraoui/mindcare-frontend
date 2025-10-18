import { useQuery } from "@tanstack/react-query";
import {getPraticienFavoris} from "@/api/Praticien";
import {PraticienFavorisModel} from "@/api/models/Praticien-model";

export const GET_PRATICIEN_FAVORIS = "praticienFavoris";

export default function useGetFavoris() {
    return useQuery<PraticienFavorisModel[]>({
        queryKey: [GET_PRATICIEN_FAVORIS],
        queryFn: () => getPraticienFavoris(),
    });
}
