type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="min-w-9 place-items-center px-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-metrixblack-800 hover:bg-primary-400 dark:text-white hover:cursor-pointer hover:outline-2 hover:outline-primary-500"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
