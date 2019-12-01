import { JWK, JWT } from "@panva/jose";

export const authRsaKey = JWK.asKey(process.env.AUTH_RSA_KEY!);

export interface ITokenPayload {
  id: string;
  name: string;
}

export function createAuthToken(payload: ITokenPayload): string {
  return JWT.sign({
    id: payload.id,
    name: payload.name,
  }, authRsaKey, {
    expiresIn: '1d',
  });
}
