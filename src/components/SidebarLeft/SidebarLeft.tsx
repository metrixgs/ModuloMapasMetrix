import { Drawer, DrawerHeader } from "flowbite-react";

import { useSidebarLeftStore } from "@/stores/useSidebarLeftStore";

const SidebarLeft = () => {
  const { isOpen, close, title, children, icon } = useSidebarLeftStore((state) => state);
  return (
    <Drawer
      className="h-[calc(100dvh-14*4px)] w-94 top-14"
      position="left"
      open={isOpen}
      onClose={close}
      backdrop={false}
    >
      <div className="h-full flex flex-col">
        <DrawerHeader title={title} titleIcon={() => icon} />
        <div className="grow overflow-y-auto">
          { children }
        </div>
      </div>
    </Drawer>
  );
};

export default SidebarLeft;
