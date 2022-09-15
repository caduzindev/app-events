import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
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

    institution.password = await hash(institution.password, 10);
    const newInstitution = await this.institutionRepository.create(institution);
    return this.buildInstitution(newInstitution);
  }

  async findOneByEmail(email: string): Promise<Institution> {
    return await this.institutionRepository.findOneByEmail(email);
  }

  buildInstitution(institution: Institution): Partial<Institution> {
    delete institution.password;
    return institution;
  }
}
