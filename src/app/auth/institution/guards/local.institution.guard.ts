import { AuthGuard } from '@nestjs/passport';

export class LocalInstitutionGuard extends AuthGuard('local') {}
