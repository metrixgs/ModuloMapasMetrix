import classNames from "classnames";

type DrawItemProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const DrawItem = ({ children, className, ...props }: DrawItemProps) => {
  return (
    <button
      className={classNames(
        "w-48 px-2 py-2 flex items-center text-sm dark:text-white hover:cursor-pointer hover:bg-primary-400 dark:hover:bg-primary-500",
        className
      )}
      { ...props }
    >
      {children}
    </button>
  );
};

export default DrawItem;