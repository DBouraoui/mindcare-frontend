import {ProModels} from "@/api/models/Pro-models";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProInformation} from "@/api/Pro";

export default function MutationUpdateProInformations(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ProModels) => updateProInformation(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["proInformations"] });
        },
    });
}