import type { FC, ReactNode } from "react";

export interface TabItemProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>;
}

export default TabItem;