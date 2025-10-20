import { useQuery } from "@tanstack/react-query";
import {GetConversation} from "@/api/Messagerie";
import {ConversationModel} from "@/api/models/Messagerie-model";

export const GET_CONVERSATION = "getConversation";

export default function useGetConversation() {
    return useQuery<ConversationModel[]>({
        queryKey: [GET_CONVERSATION],
        queryFn: () => GetConversation()
    });
}
