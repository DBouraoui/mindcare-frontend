export interface ProModels {
    id: number;
    userId: number;
    description: string;
    diplome: string;
    price: string;
    country: string;
    city: string;
    address: string;
    siren: string;
    siret: string;
    email: string;
    phone: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface ScheduleProModel {
    id: number;
    day: string;
    closed: boolean;
    morning: TimeRangeProModel | null;
    afternoon: TimeRangeProModel | null;
    updatedAt: string;
}

export interface TimeRangeProModel {
    start: string;
    end: string;
}

export interface UpdateScheduleProModel {
    id: string;
    day: string;
    morningStart: string;
    morningEnd: string;
    afternoonStart: string;
    afternoonEnd: string;
    closed: boolean;
}

export interface BookingProModel {
    id: number;
    pro: number;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    startAt: string;
    endAt: string;
    note: string;
    status: "pending" | "confirmed" | "cancelled" | "done";
}
