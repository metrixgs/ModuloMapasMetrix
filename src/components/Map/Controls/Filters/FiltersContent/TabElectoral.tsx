import SearchableSelect from "@components/UI/SearchableSelect/SearchableSelect";
import { useState } from "react";

const TabElectoral = () => {
  const [value, setValue] = useState("");

  console.log(value);

  const options = [
    {
      title: "Mexico",
      value: "opt1",
    },
    {
      title: "Colombia",
      value: "opt2"
    }
  ];
  return (
    <div>
      <SearchableSelect
        placeholder="SELECCIONE"
        sizing="sm"
        searchPlaceholder="Buscar..."
        noResultPlaceholder="No hay resultados"
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TabElectoral;
