import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma.service';
import {
  getBasicChartSvgReport,
  getHelloWorldReport,
  getStatisticsReport,
  orderByIdReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly prisma: PrismaService,
  ) {}

  async getOrderByIdReport(orderId: number) {
    const order = await this.prisma.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const docDefinition = orderByIdReport({ data: order as any });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getStatistics() {
    const topCountries = await this.prisma.customers.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountryData = topCountries.map(({ country, _count }) => ({
      country: country ?? 'País desconocido',
      customers: _count.country,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData,
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
