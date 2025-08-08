import classNames from "classnames";
import type { ReactNode } from "react";

interface BddItemSourceProps {
  banner: ReactNode;
  name: string;
  description: string;
}

const BddItemSource = ({ banner, name, description }: BddItemSourceProps) => {
  return (
    <div
      className={classNames(
        "h-32 w-32",
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
    </div>
  );
};

export default BddItemSource;