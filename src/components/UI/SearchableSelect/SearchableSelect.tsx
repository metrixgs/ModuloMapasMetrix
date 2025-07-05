import { useState } from "react";

import { Dropdown, DropdownItem, TextInput } from "flowbite-react";

const SearchableSelect = ({ options }: { options: string[] }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  // const [open, setOpen] = useState(false);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-w-72">
      <Dropdown
        label={selected || "Selecciona un país"}
        dismissOnClick={false}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="px-3 pt-2 pb-1"
        >
          <TextInput
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>

        {filtered.length > 0 ? (
          filtered.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => {
                setSelected(option);
                setSearch("");
              }}
            >
              {option}
            </DropdownItem>
          ))
        ) : (
          <DropdownItem disabled>
            No hay resultados
          </DropdownItem>
        )}
      </Dropdown>
    </div>
  );
}

export default SearchableSelect;