export interface JwtUnsigned {
    userId: string;
}

export interface JwtSigned {
    token: string;
    refreshToken: string;
}