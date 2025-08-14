import classNames from "classnames";
import { forwardRef, type HTMLAttributes } from "react";

type MenuProps = HTMLAttributes<HTMLDivElement>;

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          className,
          "flex flex-col py-2 px-2",
          "text-xs font-bold text-gray-700 dark:text-gray-100"
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Menu;
