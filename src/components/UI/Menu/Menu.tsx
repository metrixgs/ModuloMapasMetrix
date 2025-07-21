import type { ReactNode } from "react"

interface MenuProps {
  children: ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  return (
    <div className="flex flex-col py-2 divide-y divide-gray-300 dark:divide-gray-600">
      { children }
    </div>
  );
}

export default Menu;