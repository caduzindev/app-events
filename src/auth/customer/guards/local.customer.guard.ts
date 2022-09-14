import { AuthGuard } from '@nestjs/passport';

export class LocalCustomerGuard extends AuthGuard('local') {}
