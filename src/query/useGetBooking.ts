import { useQuery } from "@tanstack/react-query";
import {GetBooking} from "@/api/Booking";
import {BookingProModel} from "@/api/models/Booking-model";

export const GET_BOOKING = "getBooking";

export default function useGetBooking() {
    return useQuery<BookingProModel[]>({
        queryKey: [GET_BOOKING],
        queryFn: () => GetBooking()
    });
}
