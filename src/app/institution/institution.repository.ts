import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Institution } from './entities/institution';

@Injectable()
export class InstitutionRepository {
  constructor(private dataSource: DataSource) {}

  async create(institution: Partial<Institution>): Promise<Institution> {
    return await this.dataSource.getRepository(Institution).save(institution);
  }

  async findOneByEmail(email: string): Promise<Institution> {
    return await this.dataSource
      .getRepository(Institution)
      .findOneBy({ email });
  }

  async findOneByCnpj(cnpj: string): Promise<Institution> {
    return await this.dataSource.getRepository(Institution).findOneBy({ cnpj });
  }
}
