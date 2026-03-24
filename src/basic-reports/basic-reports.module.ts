import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BasicReportsController],
  imports: [PrinterModule],
  providers: [BasicReportsService, PrismaService],
})
export class BasicReportsModule {}
