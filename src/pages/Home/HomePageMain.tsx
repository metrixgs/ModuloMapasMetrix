import SidebarMenu from "@components/Pages/HomePage/SidebarMenu/SidebarMenu";
import MapList from "@components/Pages/HomePage/MapList/MapList";

const HomePageMain = () => {
  return (
    <main className="flex grow min-h-0">
      <SidebarMenu />
      <MapList />
    </main>
  )
}

export default HomePageMain;