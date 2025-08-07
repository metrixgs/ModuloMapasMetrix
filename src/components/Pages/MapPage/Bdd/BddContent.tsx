import Tabs from "@components/UI/Tabs/Tabs";
import TabItem from "@components/UI/Tabs/TabItem";

import { BiCloudUpload, BiCategory } from "react-icons/bi";

const BddContent = () => {
  return (
    <div className="py-1">
      <Tabs>
        <TabItem
          title="Cargar un documento"
          icon={<BiCloudUpload className="h-5 w-5" />}
        >
          Tab 1
        </TabItem>
        <TabItem
          title="Colección de mapas base"
          icon={<BiCategory className="h-5 w-5" />}
        >
          Tab 2
        </TabItem>
      </Tabs>
    </div>
  );
};

export default BddContent;
