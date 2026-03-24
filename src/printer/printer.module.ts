import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrinterService, PrismaService],
  exports: [PrinterService],
})
export class PrinterModule {}
