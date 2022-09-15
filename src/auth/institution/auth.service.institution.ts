import { AuthService } from '../auth.service.interface';
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InstitutionService } from 'src/institution/institution.service';

@Injectable()
export class AuthServiceInstitution implements AuthService {
  constructor(
    private institutionService: InstitutionService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const institution = await this.institutionService.findOneByEmail(email);
    if (!institution) return null;

    const isValidPass = await compare(password, institution.password);
    if (!isValidPass) return null;

    return this.institutionService.buildInstitution(institution);
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ id: payload.id }),
    };
  }
}
