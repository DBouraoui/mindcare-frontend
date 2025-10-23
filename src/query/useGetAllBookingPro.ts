import { useQuery } from "@tanstack/react-query";
import {BookingProModel} from "@/api/models/Pro-models";
import {getAllBooking} from "@/api/Pro";

export const GET_MESSAGE = "getAllBookingPro";

export default function useGetAllBookingPro() {
    return useQuery<BookingProModel[]>({
        queryKey: [GET_MESSAGE],
        queryFn: () => getAllBooking()
    });
}
