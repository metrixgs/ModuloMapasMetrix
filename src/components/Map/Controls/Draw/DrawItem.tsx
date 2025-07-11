import classNames from "classnames";

type DrawItemProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const DrawItem = ({ children, className, ...props }: DrawItemProps) => {
  return (
    <button
      className={classNames(
        "w-48 px-2 py-2",
        "flex items-center",
        "enabled:hover:bg-primary-400 enabled:dark:hover:bg-primary-500 disabled:opacity-50",
        "text-sm dark:text-white",
        "enabled:hover:cursor-pointer",
        className
      )}
      { ...props }
    >
      {children}
    </button>
  );
};

export default DrawItem;