import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";

import type { IconType } from "react-icons/lib";

export const iconsMap = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  bi: BiIcons,
  gi: GiIcons
};

interface MultiIconProps {
  lib: keyof typeof iconsMap; // "fa", "md", "ai"
  name: string;
  className?: string;
}

export const MultiIcon: React.FC<MultiIconProps> = ({ lib, name, className }) => {
  const library = iconsMap[lib];
  const IconComponent = library[name as keyof typeof library] as IconType;
  return IconComponent ? <IconComponent className={className} /> : null;
};
