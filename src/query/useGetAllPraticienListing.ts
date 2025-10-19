import { useQuery } from "@tanstack/react-query";
import {getAllPraticienListing} from "@/api/Praticien";
import { PraticienModel } from "@/api/models/Praticien-model";

export const GET_ALL_PRATICIEN_LISTING_KEY = "allPraticienListing";

export default function useGetAllPraticienListing() {
    return useQuery<PraticienModel[]>({
        queryKey: [GET_ALL_PRATICIEN_LISTING_KEY],
        queryFn: () => getAllPraticienListing(),
    });
}
