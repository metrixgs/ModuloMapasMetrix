import {
  Children,
  isValidElement,
  type ReactElement,
  type FC,
  type ReactNode,
  useState,
} from "react";

import classNames from "classnames";

import TabItem, { type TabItemProps } from "./TabItem";

export interface TabsProps {
  children: ReactNode;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const tabItems = Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      isValidElement(child) && child.type === TabItem
  );

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div
      className={classNames(
        "flex",
        "dark:text-white",
        "divide-x divide-gray-300 dark:divide-gray-600"
      )}
    >
      <div className="w-64 flex flex-col">
        {tabItems.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTabIndex(index)}
            className={classNames(
              "h-8 px-4",
              "flex gap-4 items-center justify-items-start",
              "text-sm font-semibold",
              "hover:cursor-pointer",
              "transition-colors duration-200",
              {
                "hover:bg-gray-200 dark:hover:bg-metrixblack-700": index !== activeTabIndex,
                "bg-primary-400/70 dark:bg-primary-400/50": index === activeTabIndex,
                "text-primary-950 dark:text-primary-100": index === activeTabIndex,
              }
            )}
          >
            {tab.props.icon}
            <span>{tab.props.title}</span>
          </button>
        ))}
      </div>
      <div
        className={classNames(
          "grow p-2 h-[calc(4px*128)] overflow-y-auto"
        )}
      >
          {tabItems[activeTabIndex]}
        </div>
    </div>
  );
};

export default Tabs;
