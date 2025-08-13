import { Tabs, TabItem } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { GiMexico } from "react-icons/gi";
import { PiIntersectFill } from "react-icons/pi";

import PoliticalDivision from "@components/Pages/MapPage/Map/Tools/PoliticalDivision/PoliticalDivision";
import Intersection from "@components/Pages/MapPage/Map/Tools/Intersection/Intersection";

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
        <TabItem
          title={t("body.controls.filters.tabs.intersection")}
          icon={PiIntersectFill}
        >
          <Intersection />
        </TabItem>
      </Tabs>
    </div>
  );
};

export default FiltersContent;
