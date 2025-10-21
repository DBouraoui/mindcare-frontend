import { useQuery } from "@tanstack/react-query";
import {DashboardInformationModel} from "@/api/models/User-model";
import {getDashboardInformation} from "@/api/User";

export const GET_MESSAGE = "getdashboardInformation";

export default function useGetDashboardInformation() {
    return useQuery<DashboardInformationModel>({
        queryKey: [GET_MESSAGE],
        queryFn: () => getDashboardInformation()
    });
}
