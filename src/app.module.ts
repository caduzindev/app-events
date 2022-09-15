import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer';
import { AuthModule } from './auth/auth.module';
import { InstitutionModule } from './institution/institution.module';
import { Institution } from './institution/entities/institution';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'eventapp',
      entities: [Customer, Institution],
      synchronize: true,
    }),
    CustomerModule,
    AuthModule,
    InstitutionModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
