
import Header from "@components/Header/Header";
import HomeMain from "./HomeMain";
import HomeFooter from "./HomeFooter";

const Home = () => {

  return (
    <div className="w-full min-h-[100dvh] flex flex-col">
      <Header />
      <HomeMain />
      <HomeFooter />
    </div>
  )
}

export default Home;