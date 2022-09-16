import { AuthGuard } from '@nestjs/passport';

export class JwtCustomerGuard extends AuthGuard('customer-jwt') {}
