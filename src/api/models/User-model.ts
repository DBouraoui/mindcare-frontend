export interface UserModel {
    email: string;
    firstname: string;
    lastname: string;
    city?: string;
    phone?: string;
    roles: string[];
}

export interface UserInformationModel {
    id: number,
    email: string;
    firstname: string;
    lastname: string;
    city: string;
    phone: string;
    isActive: boolean;
    isPro: boolean;
    createdAt: string;
    updatedAt: string;
}

export type UserEmail = Pick<UserModel, "email">

export type UserPassword = { password: string };

export interface updateInformationUserModel {
    firstname: string;
    lastname: string;
    city: string;
    phone: string;
}

export interface DashboardInformationModel {
    bookingFutur: number;
    bookingPast: number;
    praticianFavorite: number;
    newsletter: boolean;
}