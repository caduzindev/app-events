import { AuthGuard } from '@nestjs/passport';

export class JwtInstitutionGuard extends AuthGuard('jwt') {}
