import { useQuery} from "@tanstack/react-query";
import {getProInformation} from "@/api/Pro";


export const GET_PRO_INFORMATIONS_KEY = ['proInformations']

export default function useGetProInformation()
{
    return useQuery({
        queryFn: ()=> getProInformation(),
        queryKey: GET_PRO_INFORMATIONS_KEY
    })
}