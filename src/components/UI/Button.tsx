type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = "",  ...rest }: ButtonProps) => {

  const base =
    "min-w-9 flex items-center px-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-metrixblack-800 hover:bg-primary-400 dark:text-white hover:cursor-pointer hover:outline-2 hover:outline-primary-500";
  return (
    <button className={className ? `${className} ${base}` : base} {...rest}>
      {children}
    </button>
  );
};

export default Button;
