"use client"
import { useQuery} from "@tanstack/react-query";
import {LogsModel} from "@/api/models/Logs-model";
import {getUserLogsInformations} from "@/api/Log";

export const GET_LOGS_KEY = ["logs"]

export default function useGetLogsInformations() {
    return useQuery({
        queryKey: GET_LOGS_KEY,
        queryFn: (): Promise<LogsModel[]> => getUserLogsInformations(),
    })
}
