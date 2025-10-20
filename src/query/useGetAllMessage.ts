import { useQuery } from "@tanstack/react-query";
import {GetAllMessage} from "@/api/Messagerie";
import {AllConversationmodel} from "@/api/models/Messagerie-model";

export const GET_MESSAGE = "getMessage";

export default function useGetAllMessage(payload : string) {
    return useQuery<AllConversationmodel[]>({
        queryKey: [GET_MESSAGE, payload],
        queryFn: () => GetAllMessage(payload)
    });
}
