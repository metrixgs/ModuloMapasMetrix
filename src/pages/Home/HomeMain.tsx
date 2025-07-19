import Map from "@components/Map/Map";
import Sidebar from "@components/Sidebar/Sidebar";
import SidebarLeft from "@components/SidebarLeft/SidebarLeft";

import Modal from "@components/Modal/Modal";

const HomeMain = () => {
  return (
    <main className="h-[calc(100dvh-14*4px-8*4px)]">
      <Map />
      <Sidebar />
      <SidebarLeft />
      <Modal />
    </main>
  )
}

export default HomeMain;