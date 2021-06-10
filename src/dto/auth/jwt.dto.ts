interface JwtUnsigned {
    userId: string;
}

interface JwtSigned {
    token: string;
    refreshToken: string;
}