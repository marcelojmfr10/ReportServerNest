import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { ConfigModule } from '@nestjs/config';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BasicReportsModule,
    PrinterModule,
    StoreReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
