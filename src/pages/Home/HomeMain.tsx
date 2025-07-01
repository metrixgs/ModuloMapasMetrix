import Map from "@components/Map/Map";
import Sidebar from "@components/Sidebar/Sidebar";
import Modal from "@components/Modal/Modal";

const HomeMain = () => {
  return (
    <main className="h-[calc(100dvh-14*4px-8*4px)]">
      <Map />
      <Sidebar />
      <Modal />
    </main>
  )
}

export default HomeMain;