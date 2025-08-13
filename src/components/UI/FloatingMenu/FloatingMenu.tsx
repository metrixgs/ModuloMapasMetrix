import { useState, useRef, type FC, type ReactNode } from "react";

import {
  useFloating,
  offset,
  flip,
  shift,
  type Placement,
} from "@floating-ui/react";

export interface MenuItem {
  label: string;
  onClick?: () => void;
  submenu?: MenuItem[];
}

interface MenuProps {
  children: ReactNode;
  items: MenuItem[];
  placement?: Placement;
}

export const FloatingMenu: FC<MenuProps> = ({
  children,
  items,
  placement = "bottom-start",
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(4), flip(), shift()],
  });

  return (
    <div className="relative inline-block">
      <children>
        
      </children>
      <button
        ref={(node) => {
          buttonRef.current = node;
          refs.setReference(node);
        }}
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        {label}
      </button>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="bg-white border rounded shadow-lg py-1 z-50"
        >
          {items.map((item, idx) => (
            <MenuItemComponent key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "right-start",
    middleware: [offset(4), flip(), shift()],
  });

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        ref={refs.setReference}
        onClick={item.onClick}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
      >
        {item.label}
        {item.submenu && <span>▶</span>}
      </div>

      {item.submenu && open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="bg-white border rounded shadow-lg py-1 absolute z-50"
        >
          {item.submenu.map((sub, idx) => (
            <MenuItemComponent key={idx} item={sub} />
          ))}
        </div>
      )}
    </div>
  );
};
