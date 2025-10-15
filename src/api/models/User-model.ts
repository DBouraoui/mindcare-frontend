export interface UserModel {
    email: string;
    firstname: string;
    lastname: string;
    city?: string;
    phone?: string;
    roles: string[];
}