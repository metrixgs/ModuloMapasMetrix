import classNames from "classnames";

import Button from "@components/UI/Button";

const SidebarMenu = () => {
  return (
    <div
      className={classNames(
        "w-72 px-2 pt-6",
        "flex flex-col items-center",
        "bg-white dark:bg-metrixblack-800",
        "border-r border-r-gray-300 dark:border-r-gray-600",
        "dark:text-white"
      )}
    >
      <Button
        className={classNames(
          "w-40 h-10",
          "flex justify-center",
          "rounded-full",
          "!bg-primary-400 dark:!bg-primary-500",
          "!text-white"
        )}
        disabled
      >
        <b>Nuevo Mapa</b>
      </Button>
    </div>
  );
};

export default SidebarMenu;
