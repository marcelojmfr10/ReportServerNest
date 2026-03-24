import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService, PrismaService],
  imports: [PrinterModule],
})
export class StoreReportsModule {}
