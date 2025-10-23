import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBookingStatus} from "@/api/Pro";

export default function MutationUpdateBookingStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, status} : {id: string, status: string}) => updateBookingStatus({ id, status }),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['getAllBookingPro']})
        }
    });
}
