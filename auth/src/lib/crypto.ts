import { JWK } from "@panva/jose";

export const authRsaKey = JWK.asKey(process.env.AUTH_RSA_KEY!);
