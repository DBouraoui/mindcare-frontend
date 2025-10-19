import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DeleteBooking} from "@/api/Booking";

export default function MutationDeleteBooking(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: string) => DeleteBooking(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBooking"] });
        },
    });
}