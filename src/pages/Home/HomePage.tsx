import Header from "@components/Header/Header";
import HomePageMain from "@/pages/Home/HomePageMain";

const HomePage = () => {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Header />
      <HomePageMain />
    </div>
  )
}

export default HomePage;