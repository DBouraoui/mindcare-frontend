import { useQuery} from "@tanstack/react-query";
import {getUserInformations} from "@/api/User";

export const USER_INFORMATION_KEY = ["userInformations"]

export default function useGetUserInformations() {
 return useQuery({
     queryKey: USER_INFORMATION_KEY,
     queryFn: () => getUserInformations()

 });
}
