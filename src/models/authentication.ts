export interface LOGIN_BODY_TYPE {
  username: string;
  password: string;
  scope: string;
  grant_type: string;
  client_secret: string;
  client_id: string;
}

export interface LOGIN_RESPONSE_TYPE {
  access_token: string;
  refresh_token: string;
  scope: string;
  id_token: string;
  token_type: string;
  expires_in: string;
}
