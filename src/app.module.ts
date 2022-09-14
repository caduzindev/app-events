import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer';
import { AuthModule } from './auth/auth.module';
import { InstitutionController } from './institution/institution.controller';
import { InstitutionService } from './institution/institution.service';
import { InstitutionModule } from './institution/institution.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'eventapp',
      entities: [Customer],
      synchronize: true,
    }),
    CustomerModule,
    AuthModule,
    InstitutionModule,
  ],
  controllers: [AppController, InstitutionController],
  providers: [AppService, InstitutionService],
})
export class AppModule {}
