import { Disc } from "./disc.interface";

export interface User {
    id:number;
    pdga_number: string;
    first_name: string;
    last_name: string;
    email:string;
    username: string;
    password: string;
    role: string;
    collection?: Disc[];
}