import classNames from "classnames";
import type { ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col py-2 px-2",
        "text-xs font-bold text-gray-700 dark:text-gray-100"
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
