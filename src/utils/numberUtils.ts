import i18next from "@/translations/index";

export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {}
) => {
  const locale = i18next.language;

  const formatter = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });

  const formatted = formatter.format(value);
  const [intPart, decimalPart] = formatted.split(/[,\.]/);

  const withGrouping = intPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    locale.startsWith("es") ? "." : ","
  );

  if (decimalPart !== undefined) {
    const decimalSeparator = locale.startsWith("es") ? "," : ".";
    return withGrouping + decimalSeparator + decimalPart;
  }

  return withGrouping;
};
