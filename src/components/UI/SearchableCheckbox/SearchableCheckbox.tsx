import { useState } from "react";

import classNames from "classnames";

import { Checkbox, Popover, TextInput, Label } from "flowbite-react";

import { BiCaretDown } from "react-icons/bi";

import Button from "@components/UI/Button";

interface Option {
  title: any;
  value: any;
}

type SearchableCheckboxProps = {
  placeholder?: string;
  searchPlaceholder: string;
  noResultPlaceholder: string;
  options: Option[];
  selected: any[];
  onChange: (value: Option["value"]) => void;
  disabled?: boolean;
};

type SearchableCheckboxOptionProps = {
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchableCheckboxOption = ({
  className,
  title,
  ...props
}: SearchableCheckboxOptionProps) => {
  const id = crypto.randomUUID();
  return (
    <div className="flex gap-1 flex-wrap px-3">
      <Checkbox id={id} className={classNames(className)} {...props} />
      <Label className="text-xs dark:text-white" htmlFor={id}>
        {title}
      </Label>
    </div>
  );
};

const SearchableCheckbox = ({
  placeholder,
  searchPlaceholder,
  noResultPlaceholder,
  options,
  onChange,
  selected,
  disabled,
}: SearchableCheckboxProps) => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const filtered = options.filter((option) => {
    try {
      const bool = String(option.title).toLowerCase().includes(search.toLowerCase());
      return bool;
    } catch (error) {
      console.error(option, error);
      return false;
    }
  });

  const handleCheck = (option: Option) => {
    if (onChange) {
      const value = option.value;
      onChange(value);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      arrow={false}
      content={
        <div className="max-h-60 min-w-40 max-w-52 py-2 flex flex-col gap-1">
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
          <div className="w-full py-1 px-2 overflow-y-auto">
            {filtered.length > 0 ? (
              <div className="flex flex-col gap-3">
                {/* TODO: Select all | Delete all */}
                {filtered.map((option, index) => (
                  <SearchableCheckboxOption
                    key={index}
                    title={String(option.title)}
                    value={String(option.value)}
                    checked={selected.includes(option.value)}
                    onChange={() => {
                      handleCheck(option);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm text-center dark:text-white">
                {noResultPlaceholder}
              </div>
            )}
          </div>
        </div>
      }
    >
      <Button
        className="h-8 w-full text-sm justify-center items-center"
        disabled={disabled}
      >
        <span>
          {selected.length} {placeholder}
        </span>
        <BiCaretDown className="ms-2" />
      </Button>
    </Popover>
  );
};

export default SearchableCheckbox;
