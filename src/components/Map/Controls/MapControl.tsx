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
        "hover:cursor-pointer hover:outline-2",
        "dark:text-white hover:outline-primary-500",
        {
          "bg-primary-400": active,
          "bg-white dark:bg-metrixblack-800 hover:bg-primary-400": !active
        }
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
