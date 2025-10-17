import { useQuery} from "@tanstack/react-query";
import {NotificationModels} from "@/api/models/Notification-models.";
import {getNotifications} from "@/api/Notification";

export const GET_INFORMATIONS_KEY = ["notifications"]

export default function useGetNotifications() {
 return useQuery({
     queryKey: GET_INFORMATIONS_KEY,
     queryFn: (): Promise<NotificationModels[]> => getNotifications(),
 })
}
