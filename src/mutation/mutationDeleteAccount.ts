import { useMutation } from "@tanstack/react-query";
import {delteAccountUser} from "@/api/User";

export default function MutationDeleteAccount() {
    return useMutation({
        mutationFn: () => delteAccountUser(),
    });
}
