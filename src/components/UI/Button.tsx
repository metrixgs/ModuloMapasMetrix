import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = "", ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "min-w-9 px-2",
        "flex items-center",
        "bg-white dark:bg-metrixblack-800 enabled:hover:bg-primary-400 disabled:opacity-50",
        "transition-colors duration-200",
        "rounded",
        "border border-gray-300 dark:border-gray-600",
        // "enabled:hover:outline-2 enabled:hover:outline-primary-500",
        "dark:text-white",
        "enabled:hover:cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
