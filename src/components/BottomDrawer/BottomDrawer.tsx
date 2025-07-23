import { Drawer, DrawerHeader } from "flowbite-react";

import { useBottomDrawerStore } from "@/stores/useBottomDrawerStore";

const BottomDrawer = () => {
  const {
    isOpen,
    isHeaderEnabled,
    close,
    title,
    children,
    icon
  } = useBottomDrawerStore((state) => state);
  
  return (
    <Drawer position="bottom" open={isOpen} onClose={close} backdrop={false} className="!p-0">
      <div className="h-full flex flex-col">
        {
          isHeaderEnabled && <DrawerHeader title={title} titleIcon={() => icon} />
        }
        <div className="grow overflow-y-auto">
          { children }
        </div>
      </div>
    </Drawer>
  );
};

export default BottomDrawer;
