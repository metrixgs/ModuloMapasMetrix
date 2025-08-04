import { useEffect, useState, type ChangeEvent } from "react";

import classNames from "classnames";

import { Popover, Select, TextInput, type SelectProps } from "flowbite-react";

interface Option {
  title: string;
  value: string;
}

type SearchableSelectProps = {
  placeholder?: string;
  searchPlaceholder: string;
  noResultPlaceholder: string;
  options: Option[];
} & SelectProps;

type SearchableSelectOptionProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SearchableSelectOption = ({
  children,
  className,
  ...props
}: SearchableSelectOptionProps) => {
  return (
    <button
      className={classNames(
        "w-full max-w-56 px-2 py-2",
        "flex items-center",
        "enabled:hover:bg-primary-400 enabled:dark:hover:bg-primary-500 disabled:opacity-50",
        "text-sm dark:text-white",
        "enabled:hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const SearchableSelect = ({
  placeholder,
  searchPlaceholder,
  noResultPlaceholder,
  options,
  value,
  onChange,
  name,
  ...rest
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState("");

  const selectedValue = value ?? internalValue;
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const filtered = options.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (selected: Option) => {
    setOpen(false);
    setSearch("");
    if (!value) setInternalValue(selected.value);
    if (onChange) {
      const event = {
        target: {
          value: selected.value,
          name,
        },
      } as unknown as ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue("");
    }
  }, [value]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      arrow={false}
      content={
        <div className="min-w-56 flex flex-col gap-2 py-2">
          <div onClick={(e) => e.stopPropagation()}>
            <TextInput
              sizing="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              onKeyDown={(e) => e.stopPropagation()}
              className="mx-2"
            />
          </div>
          <div className="w-full max-h-80 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((option, index) => (
                <SearchableSelectOption
                  key={index}
                  onClick={() => {
                    handleSelect(option);
                  }}
                >
                  <p>{option.title}</p>
                </SearchableSelectOption>
              ))
            ) : (
              <div className="text-sm text-center dark:text-white">{noResultPlaceholder}</div>
            )}
          </div>
        </div>
      }
    >
      <Select
        value={selectedValue}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        onChange={onChange}
        {...rest}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        <option hidden value={selectedOption?.value}>
          {selectedOption?.title}
        </option>
      </Select>
    </Popover>
  );
};

export default SearchableSelect;
