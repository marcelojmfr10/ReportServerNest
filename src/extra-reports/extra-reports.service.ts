import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getCustomReport, getHelloWorldReport } from 'src/reports';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');
    const content = getHtmlContent(html, {
      client: 'Marcelo Fuentes',
      title: 'Hola mundo',
    });
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir html',
      }),
      content: content,
      footer: footerSection,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCustom() {
    const docDefinition = getCustomReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      // pageSize: 'TABLOID',
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        {
          qr: 'https://www.google.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });
    return doc;
  }
}
