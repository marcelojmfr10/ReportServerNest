import { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
    name: string;
}

export const getHelloWorldReport = (options: ReportOptions) => {
    const { name } = options;
    const docDefinition: TDocumentDefinitions = {
        content: [`Hola mundo ${name}`]
    };

    return docDefinition;
}