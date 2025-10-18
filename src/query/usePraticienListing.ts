import { useQuery } from "@tanstack/react-query";
import { getPraticienListing } from "@/api/Praticien";
import { PraticienModel } from "@/api/models/Praticien-model";

export const GET_PRATICIEN_LISTING_KEY = "praticienListing";

export default function useGetPraticienListing(payload: string) {
    return useQuery<PraticienModel[]>({
        queryKey: [GET_PRATICIEN_LISTING_KEY, payload],
        queryFn: () => getPraticienListing(payload),
        enabled: payload.trim().length >= 3,
    });
}
