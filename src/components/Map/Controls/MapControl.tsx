type MapControlProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type MapControlGroupProps = {
  children: React.ReactNode
} 

export const MapControl = ({ children, ...props }: MapControlProps) => {
  return (
    <button
      className="h-9 w-9 flex justify-center items-center p-2 rounded shadow bg-white dark:bg-metrixblack-800 hover:bg-primary-400 text-xs dark:text-white hover:cursor-pointer hover:outline-2 hover:outline-primary-500"
      {...props}
    >
      { children }
    </button>
  );
};

export const MapControlGroup = ({ children, ...props }: MapControlGroupProps) => {
  return (
    <div
      className="flex flex-col gap-0.5"
      {...props}
    >
      { children }
    </div>
  )
}
