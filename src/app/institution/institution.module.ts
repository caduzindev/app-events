import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripePayGateway } from 'src/infra/payment/stripe-pay-gateway';
import { PaymentService } from 'src/app/payment/payment.service';
import { Institution } from './entities/institution';
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
  imports: [TypeOrmModule.forFeature([Institution])],
})
export class InstitutionModule {}
