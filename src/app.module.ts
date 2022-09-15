import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './app/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './app/customer/entities/customer';
import { AuthModule } from './app/auth/auth.module';
import { InstitutionModule } from './app/institution/institution.module';
import { Institution } from './app/institution/entities/institution';
import { PaymentModule } from './app/payment/payment.module';
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
