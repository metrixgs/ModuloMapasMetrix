export const downloadGeoJSON = (geojson: object, filename="data.geojson") => {
  const blob = new Blob(
    [JSON.stringify(geojson, null, 2)], { type: "application/geo+json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

export const downloadCSV = <T extends object>(data: T[], filename="table.csv") => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const content = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((field) => {
        const value = row[field as keyof T];
        const escaped = String(value ?? "").replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}