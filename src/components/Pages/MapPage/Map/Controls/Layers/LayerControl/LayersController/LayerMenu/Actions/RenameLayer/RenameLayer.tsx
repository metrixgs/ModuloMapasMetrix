import { BiRename, BiSave } from "react-icons/bi";

import { TextInput, HelperText } from "flowbite-react";

import type { LayerMenuItemActionProps } from "@/types/LayerMenu";

import MenuItem from "@components/UI/Menu/MenuItem";
import Button from "@components/UI/Button";

import { useMapLayersStore } from "@/stores/useMapLayersStore";

const RenameLayer = ({
  targetLayer,
  translation,
  setAuxModalState,
  auxModalState,
}: LayerMenuItemActionProps) => {
  const tref = "body.controls.layers.tabs.layers.layer-menu";

  const { renameLayer } = useMapLayersStore((state) => state);

  const handleRename = (id: string) => {
    if (!auxModalState || !setAuxModalState) return;

    const AuxModalContent = () => {
      const fieldReference = "new-layer-name";
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const newName = data[fieldReference].toString();

            renameLayer(id, newName);

            setAuxModalState({
              ...auxModalState,
              active: false,
            });
          }}
          className="w-full p-2 flex flex-col gap-4 items-center"
        >
          <div className="w-full">
            <TextInput
              id={"id-" + fieldReference}
              name={fieldReference}
              sizing="sm"
              defaultValue={targetLayer.name}
            />
            <HelperText className="text-xs">
              {translation(tref + ".rename.help")}
            </HelperText>
          </div>
          <Button className="w-fit h-8" type="submit">
            <BiSave className="w-5 h-5 mr-2" />
            <span className="text-xs">
              {translation(tref + ".rename.apply-button-title")}
            </span>
          </Button>
        </form>
      );
    };
    setAuxModalState({
      active: true,
      content: <AuxModalContent />,
    });
  };

  return (
    <MenuItem onClick={() => handleRename(targetLayer.id)}>
      <BiRename className="w-5 h-5 mr-2" />
      <span>
        {translation(tref + ".rename.button-title")}
      </span>
    </MenuItem>
  );
};

export default RenameLayer;
