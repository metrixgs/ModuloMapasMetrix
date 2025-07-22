import classNames from "classnames";

type MapControlProps = {
  active?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type MapControlGroupProps = {
  children: React.ReactNode;
};

export const MapControl = ({ children, active, className, ...props }: MapControlProps) => {
  return (
    <button
      className={classNames(
        className,
        "h-9 w-9 p-2 rounded shadow text-xs",
        "flex justify-center items-center",
        // "hover:outline-2 hover:outline-primary-500",
        "hover:cursor-pointer",
        "dark:text-white",
        {
          "bg-primary-400": active,
          "bg-white dark:bg-metrixblack-800 hover:bg-primary-400": !active
        },
        "transition-colors duration-200"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const MapControlGroup = ({
  children,
  ...props
}: MapControlGroupProps) => {
  return (
    <div className="flex flex-col gap-0.5" {...props}>
      {children}
    </div>
  );
};
