import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subTitle, showLogo = true, showDate = true } = options;

    const headerLogo = showLogo ? logo : null;
    const headerDate = showDate ? {
        text: DateFormatter.getDDMMMMYYY(new Date()),
        alignment: 'right',
        margin: [20, 20, 20, 20],
    } as any : null;
    
    const headerTitle = title ? {text: title, style: {
        bold: true,
    }} : null;

    return {
        columns: [headerLogo, headerTitle, headerDate]
    }
}