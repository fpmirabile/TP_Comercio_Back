import { JwtSigned } from "./jwt.dto";

export interface LoginRequestDto {
    email: string;
    password: string;
}


export interface LoginResponseDto {
    tokens: JwtSigned;
}