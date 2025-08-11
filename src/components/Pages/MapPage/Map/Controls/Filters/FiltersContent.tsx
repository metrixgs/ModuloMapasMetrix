import { Tabs, TabItem } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { GiMexico } from "react-icons/gi";
import { MdHowToVote } from "react-icons/md";
import { PiIntersectFill } from "react-icons/pi";
// import { BiMath } from "react-icons/bi";

import PoliticalDivision from "@components/Pages/MapPage/Map/Tools/PoliticalDivision/PoliticalDivision";
import Electoral from "@components/Pages/MapPage/Map/Tools/Electoral/Electoral";
import Intersection from "@components/Pages/MapPage/Map/Tools/Intersection/Intersection";
// import FeatureExpression from "@components/Pages/MapPage/Map/Tools/FeatureExpression/FeatureExpression";

const FiltersContent = () => {
  const { t } = useTranslation("global");
  return (
    <div className="h-full flex flex-col justify-between">
      <Tabs variant="pills">
        <TabItem
          active
          title={t("body.controls.filters.tabs.geographic")}
          icon={GiMexico}
        >
          <PoliticalDivision />
        </TabItem>
        {/* <TabItem
          title={t("body.controls.filters.tabs.electoral")}
          icon={MdHowToVote}
        >
          <Electoral />
        </TabItem> */}
        <TabItem
          title={t("body.controls.filters.tabs.intersection")}
          icon={PiIntersectFill}
        >
          <Intersection />
        </TabItem>
        {/* <TabItem
          title={t("body.controls.filters.tabs.feature-expression")}
          icon={BiMath}
        >
          <FeatureExpression />
        </TabItem> */}
      </Tabs>
    </div>
  );
};

export default FiltersContent;
