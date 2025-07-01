import { Drawer, DrawerHeader } from "flowbite-react";

import { useSidebarStore } from "@/stores/useSidebarStore";

const Sidebar = () => {
  const { isOpen, close, title, children, icon } = useSidebarStore((state) => state);
  return (
    <Drawer
      position="right"
      open={isOpen}
      onClose={close}
      backdrop={false}
    >
      <DrawerHeader title={title} titleIcon={() => icon} />
      { children }
    </Drawer>
  );
};

export default Sidebar;
