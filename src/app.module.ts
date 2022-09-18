import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './app/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { InstitutionModule } from './app/institution/institution.module';
import { PaymentModule } from './app/payment/payment.module';
import { EventModule } from './app/event/event.module';
import { TicketModule } from './app/ticket/ticket.module';
import { WebhooksModule } from './app/webhooks/webhooks.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV == 'production' ? false : true,
    }),
    EventEmitterModule.forRoot(),
    CustomerModule,
    AuthModule,
    InstitutionModule,
    PaymentModule,
    EventModule,
    TicketModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
