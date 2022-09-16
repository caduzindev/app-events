import { AuthGuard } from '@nestjs/passport';

export class LocalCustomerGuard extends AuthGuard('customer-local') {}
