import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SendMessage} from "@/api/Messagerie";
import {CreateMessageModel} from "@/api/models/Messagerie-model";

export default function MutationSendMessage(payload : string){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateMessageModel) => SendMessage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getMessage", payload] });
        },
    });
}