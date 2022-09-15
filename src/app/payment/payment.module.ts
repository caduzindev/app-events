import { Module } from '@nestjs/common';
import { StripePayGateway } from 'src/infra/payment/stripe-pay-gateway';
import { PaymentService } from './payment.service';

@Module({
  providers: [PaymentService, StripePayGateway],
  exports: [PaymentService, StripePayGateway],
})
export class PaymentModule {}
