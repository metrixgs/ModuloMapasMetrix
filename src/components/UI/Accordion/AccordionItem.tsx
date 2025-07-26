import { useState, type ReactNode, type FC } from "react";

import classNames from "classnames";

import { BiCaretRight } from "react-icons/bi";

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
}

export const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={classNames(
        "py-1",
        "flex flex-col justify-center"
      )}
    >
      <div
        className={classNames(
          "w-full",
          "flex items-center gap-2",
          "font-bold text-metrixblack-400 dark:text-metrixblack-100"
        )}
      >
        <button
          className={classNames(
            "h-9 w-9",
            "flex justify-center items-center",
            "rounded-full",
            "hover:bg-gray-100 dark:hover:bg-gray-600",
            "hover:cursor-pointer"
          )}
          onClick={() => setActive(!active)}
        >
          <BiCaretRight className={classNames(
            "",
            {
              "rotate-90": active,
            }
          )} />
        </button>
        <div className="flex-grow text-sm">
          { title }
        </div>
      </div>
      {active && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

AccordionItem.displayName = "AccordionItem";