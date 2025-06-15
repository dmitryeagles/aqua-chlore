export interface CreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  gender: boolean;
  birthDate: string;
  registrationRegionId: string;
  eduLevelId: string;
  haveProfExperience: boolean;
  password: string;
  photo: string;
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
