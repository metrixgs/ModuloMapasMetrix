import classNames from "classnames";

type MenuItemProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const MenuItem = ({ children, className, ...props }: MenuItemProps) => {
  return (
    <button
      className={classNames(
        "w-full px-3 py-1",
        "flex items-center",
        "enabled:hover:bg-primary-400 enabled:dark:hover:bg-primary-600 disabled:opacity-50",
        "transition-colors duration-200",
        "rounded-lg",
        "enabled:hover:cursor-pointer",
        className
      )}
      { ...props }
    >
      {children}
    </button>
  );
};

export default MenuItem;