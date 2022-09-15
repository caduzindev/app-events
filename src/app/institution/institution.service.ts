import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PaymentService } from '../payment/payment.service';
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
    if (await this.findOneByEmail(institution.email)) {
      throw new BadRequestException(`O email ${institution.email} já existe`);
    }

    if (await this.findOneByCnpj(institution.cnpj)) {
      throw new BadRequestException(`O cnpj ${institution.cnpj} já existe`);
    }
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

  async findOneByCnpj(cnpj: string): Promise<Institution> {
    return await this.institutionRepository.findOneByCnpj(cnpj);
  }

  buildInstitution(institution: Institution): Partial<Institution> {
    delete institution.password;
    return institution;
  }
}
