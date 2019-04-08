/*
  Authentication service.
*/

import Axios, { AxiosInstance } from 'axios';

/**
 * Login request interface
 */
export interface LoginRequest {
  username: string;
  password: string;
  chaptha?: string;
}

class AuthenticationService {
  constructor(
    private axios: AxiosInstance
  ) {}

  /**
   * Login
   */
  public Login(request: LoginRequest) {

  }
}
