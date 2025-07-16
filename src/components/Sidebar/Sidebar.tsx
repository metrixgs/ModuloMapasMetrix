import { Drawer, DrawerHeader } from "flowbite-react";

import { useSidebarStore } from "@/stores/useSidebarStore";

const Sidebar = () => {
  const { isOpen, close, title, children, icon } = useSidebarStore((state) => state);
  return (
    <Drawer
      className="h-[calc(100dvh-14*4px)] top-14"
      position="right"
      open={isOpen}
      onClose={close}
      backdrop={false}
    >
      <div className="h-full flex flex-col">
        <DrawerHeader title={title} titleIcon={() => icon} />
        <div className="grow">
          { children }
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
