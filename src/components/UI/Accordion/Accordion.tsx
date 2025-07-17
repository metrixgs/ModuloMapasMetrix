import { isValidElement, Children, type ReactNode, type FC } from "react";

import classNames from "classnames";

interface AccordionProps {
  children: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ children }) => {
  const validChildren = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type as any).displayName === "AccordionItem"
    ) {
      return child;
    } else {
      console.warn("Accordion solo puede contener elementos AccordionItem.");
      return null;
    }
  });

  return (
    <div
      className={classNames(
        "border-t border-b border-gray-300 dark:border-gray-600",
        "divide-y divide-gray-300 dark:divide-gray-600"
      )}
    >
      {validChildren}
    </div>
  );
};
