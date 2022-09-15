import { Module } from '@nestjs/common';
import { StripePayGateway } from 'src/infra/payment/stripe-pay-gateway';
import { PaymentService } from './../payment/payment.service';
import { InstitutionController } from './institution.controller';
import { InstitutionRepository } from './institution.repository';
import { InstitutionService } from './institution.service';

@Module({
  exports: [InstitutionService],
  controllers: [InstitutionController],
  providers: [
    InstitutionService,
    InstitutionRepository,
    PaymentService,
    StripePayGateway,
  ],
  imports: [],
})
export class InstitutionModule {}
