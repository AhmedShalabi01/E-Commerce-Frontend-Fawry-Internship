import { Authority } from "./authority";

export interface User{
        "username": string,
        "enabled": number,
        "authority": Authority
}