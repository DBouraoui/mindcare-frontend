export interface TimeSlotModel {
    start: string | null;
    end: string | null;
}

export interface ScheduleSlotModel {
    id: number;
    day: string;
    closed: boolean;
    morning: TimeSlotModel | null;
    afternoon: TimeSlotModel | null;
    updatedAt: string | null;
}

export interface PraticienModel {
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
    isFavorite?: boolean;
    updatedAt: string;
    createdAt: string;
    horraires: ScheduleSlotModel[];
}

export interface PraticienFavorisModel {
    id: number;
    idPro: number;
    firstname: string;
    lastname: string;
    title: string;
    city: string;
    address: string;
    createdAt: string;
}
