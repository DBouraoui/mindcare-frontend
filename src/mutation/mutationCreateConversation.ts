import { useMutation } from "@tanstack/react-query";
import {CreateConversation} from "@/api/Messagerie";
import {CreateConversationModel} from "@/api/models/Messagerie-model";

export default function MutationCreateConversation() {
    return useMutation({
        mutationFn: (proId: CreateConversationModel) => CreateConversation(proId),
    });
}
