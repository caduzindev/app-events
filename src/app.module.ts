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
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'eventapp',
      autoLoadEntities: true,
      synchronize: true,
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
export class AppModule {}
