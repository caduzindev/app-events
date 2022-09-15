import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { Institution } from './entities/institution';
import { InstitutionRepository } from './institution.repository';

@Injectable()
export class InstitutionService {
  constructor(
    private institutionRepository: InstitutionRepository,
    private paymentService: PaymentService,
  ) {}
  async createInstitution(
    institution: Partial<Institution>,
  ): Promise<Partial<Institution>> {
    const pay_id = await this.paymentService.createAccountSeller(
      institution.email,
    );

    institution.pay_id = pay_id;

    const newInstitution = await this.institutionRepository.create(institution);
    return this.buildInstitution(newInstitution);
  }

  buildInstitution(institution: Institution): Partial<Institution> {
    delete institution.password;
    return institution;
  }
}
