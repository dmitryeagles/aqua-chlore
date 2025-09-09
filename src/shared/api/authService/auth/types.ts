export interface CreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  phone?: string | null;
  password: string;
}

export interface GetTokenRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  jwtToken: string;
}

export interface TokenResponse {
  jwtToken: string;
  refreshToken: string;
  expiresAt: string;
}
