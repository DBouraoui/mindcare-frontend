export interface BookingProModel {
    id: string;
    userId: string;
    pro: {
        id: string;
        firstname: string;
        lastname: string;
        city: string;
        address: string;
    };
    startAt: string;
    endAt: string;
    createdAt: string;
    note?: string | null;
    status: "pending" | "confirmed" | "done" | "cancelled";
}
