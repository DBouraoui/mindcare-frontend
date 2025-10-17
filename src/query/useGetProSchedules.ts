import {useQuery} from "@tanstack/react-query";
import {getProschedulesInformations} from "@/api/Pro";

export const PRO_SCHEDULES_KEY = ["schedulesPro"]


export default function useGetProSchedules() {
    return useQuery({
        queryKey: PRO_SCHEDULES_KEY,
        queryFn: () => getProschedulesInformations()

    });
}
