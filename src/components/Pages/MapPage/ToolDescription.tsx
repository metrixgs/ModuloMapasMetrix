interface TabDescriptionProps {
  description: string;
}

const ToolDescription = ({ description }: TabDescriptionProps) => {
  return (
    <div className="py-3 px-2 rounded-lg bg-gray-200 dark:bg-metrixblack-700">
      <p className="text-sm font-semibold text-center dark:text-white">{description}</p>
    </div>
  );
};

export default ToolDescription;
