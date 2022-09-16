import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtInstitutionGuard } from '../auth/institution/guards/jwt.institution.guard';
import { CreateInstitutionDto } from './dto/request/create.institution.dto';
import { ActivateAccountPayment } from './dto/response/activate.account.payment.dto';
import { InstitutionService } from './institution.service';

@Controller('institution')
export class InstitutionController {
  constructor(private institutionService: InstitutionService) {}

  @Post('create')
  async createInstitution(
    @Body() createInstitutionDto: CreateInstitutionDto,
  ): Promise<any> {
    return await this.institutionService.createInstitution(
      createInstitutionDto,
    );
  }
  @UseGuards(JwtInstitutionGuard)
  @Get('activatePayment')
  async activateAccountPayment(
    @Request() req,
  ): Promise<ActivateAccountPayment> {
    const account = await this.institutionService.findOneById(req.user.id);
    return await this.institutionService.activateAccountPayment(account.pay_id);
  }
}
