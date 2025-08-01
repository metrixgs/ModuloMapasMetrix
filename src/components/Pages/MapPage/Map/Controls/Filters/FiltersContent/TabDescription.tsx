interface TabDescriptionProps {
  description: string;
}

const TabDescription = ({ description }: TabDescriptionProps) => {
  return (
    <div className="py-3 px-2 rounded-lg bg-gray-300 dark:bg-metrixblack-700">
      <p className="text-sm dark:text-white">{description}</p>
    </div>
  );
};

export default TabDescription;
