import { useEffect, useRef, useState } from "react";

import { TextInput, type TextInputProps } from "flowbite-react";
import classNames from "classnames";

import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";

export interface SearchOption<T> {
  title: string;
  value: T;
}

interface SearchProps<T> extends TextInputProps {
  options?: SearchOption<T>[];
  onSelectOption?: (selected: T) => void;
  noResultPlaceholder?: string;
  makeSearch: boolean;
}

function Search<T>({
  value,
  onChange,
  options,
  onSelectOption,
  onFocus,
  noResultPlaceholder,
  makeSearch: search,
  ...rest
}: SearchProps<T>) {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState("");

  const filteredOptions = options
    ? options.filter((option) => {
        try {
          const bool = String(option.title)
            .toLowerCase()
            .includes(String(internalValue).toLowerCase());
          return bool;
        } catch (error) {
          console.error(option, error);
          return false;
        }
      })
    : [];

  const handleSelect = (selectedValue: T) => {
    if (onSelectOption) {
      onSelectOption(selectedValue);
    }
    setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <TextInput
        value={internalValue}
        onChange={(e) => {
          const value = e.target.value;
          setInternalValue(value);
          if (onChange) {
            onChange(e);
          }
        }}
        {...rest}
        onFocus={(e) => {
          setActive(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
      />
      <Menu
        className={classNames(
          "mt-2 max-h-72",
          "gap-2",
          "overflow-y-auto",
          "bg-white dark:bg-metrixblack-800",
          "rounded-xl",
          "border border-gray-300 dark:border-gray-600",
          "transition-opacity duration-500",
          {
            "opacity-100": active,
            "opacity-0 pointer-events-none": !active,
          }
        )}
      >
        {
          {
            0: (
              <>
                {options && options.length > 0 ? (
                  options.map((op, i) => (
                    <MenuItem
                      key={i}
                      className="text-start whitespace-pre-line"
                      onClick={() => handleSelect(op.value)}
                    >
                      {op.title}
                    </MenuItem>
                  ))
                ) : (
                  <span className="text-center">{noResultPlaceholder}</span>
                )}
              </>
            ),
            1: (
              <>
                {filteredOptions && filteredOptions.length > 0 ? (
                  filteredOptions.map((op, i) => (
                    <MenuItem
                      key={i}
                      className="text-start whitespace-pre-line"
                      onClick={() => handleSelect(op.value)}
                    >
                      {op.title}
                    </MenuItem>
                  ))
                ) : (
                  <span className="text-center">{noResultPlaceholder}</span>
                )}
              </>
            ),
          }[Number(search)]
        }
      </Menu>
    </div>
  );
}

export default Search;
