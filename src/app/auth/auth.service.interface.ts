export interface AuthService {
  validate(email: string, password: string): Promise<any>;
}
