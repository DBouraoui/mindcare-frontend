import { useQuery } from "@tanstack/react-query";
import {getPraticienInformation} from "@/api/Praticien";
import { PraticienModel } from "@/api/models/Praticien-model";

export const GET_PRATICIEN_INFORMATION_KEY = "praticienInformations";

export default  function useGetPraticienInformations(payload: string) {
    return useQuery<PraticienModel>({
        queryKey: [GET_PRATICIEN_INFORMATION_KEY, payload],
        queryFn: () => getPraticienInformation(payload),
        enabled: payload.trim().length > 0,
    });
}
