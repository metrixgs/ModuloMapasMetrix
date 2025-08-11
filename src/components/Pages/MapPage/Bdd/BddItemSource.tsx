import classNames from "classnames";
import type { ReactNode } from "react";

interface BddItemSourceProps {
  banner: ReactNode;
  name: string;
  description: string;
  action: () => void;
}

const BddItemSource = ({ banner, name, description, action }: BddItemSourceProps) => {
  return (
    <button
      onClick={action}
      className={classNames(
        "h-24 w-64 p-2",
        "flex items-center gap-2",
        "transition-transform duration-300 hover:scale-105 hover:cursor-pointer",
        "border border-gray-300 dark:border-gray-600",
        "rounded-lg"
      )}
    >
      {banner}
      <div className="h-1/3">
        <h5 className="font-semibold text-sm">{name}</h5>
        <p className="text-xs">{description}</p>
      </div>
    </button>
  );
};

export default BddItemSource;