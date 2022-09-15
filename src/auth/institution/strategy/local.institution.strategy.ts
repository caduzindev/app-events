import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceInstitution } from '../auth.service.institution';

@Injectable()
export class LocalInstitutionStrategy extends PassportStrategy(Strategy) {
  constructor(private authServiceInstitution: AuthServiceInstitution) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<any> {
    const institution = this.authServiceInstitution.validate(
      username,
      password,
    );

    if (!institution) throw new UnauthorizedException();

    return institution;
  }
}
