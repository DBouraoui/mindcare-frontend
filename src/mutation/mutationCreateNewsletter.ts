import {useMutation, useQueryClient} from "@tanstack/react-query";
import { updateNewsletter} from "@/api/Newsletter";

export default function MutationCreateNewsletter() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: () => updateNewsletter(),
        onSuccess: ()=>{
            query.invalidateQueries({queryKey:['getdashboardInformation']});
        },
    });
}
