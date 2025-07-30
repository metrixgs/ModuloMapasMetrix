import { Tabs, TabItem } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { GiMexico } from "react-icons/gi";
import { MdHowToVote } from "react-icons/md";
import { PiIntersectFill } from "react-icons/pi";

import TabGeographic from "@components/Pages/MapPage/Map/Controls/Filters/FiltersContent/TabGeographic";
import TabElectoral from "@components/Pages/MapPage/Map/Controls/Filters/FiltersContent/TabElectoral";
import TabIntersection from "@components/Pages/MapPage/Map/Controls/Filters/FiltersContent/TabIntersection";

const FiltersContent = () => {
  const { t } = useTranslation("global");
  return (
    <div className="h-full flex flex-col justify-between">
      <Tabs variant="pills">
        <TabItem
          active
          title={t("body.controls.filters.tabs.geographic.title")}
          icon={GiMexico}
          className="scroll-auto"
        >
          <TabGeographic />
        </TabItem>
        <TabItem
          title={t("body.controls.filters.tabs.electoral.title")}
          icon={MdHowToVote}
        >
          <TabElectoral />
        </TabItem>
        <TabItem
          title={t("body.controls.filters.tabs.intersection.title")}
          icon={PiIntersectFill}
        >
          <TabIntersection />
        </TabItem>
      </Tabs>
    </div>
  );
};

export default FiltersContent;
