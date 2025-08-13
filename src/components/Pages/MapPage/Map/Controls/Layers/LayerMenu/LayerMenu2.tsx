import {
  FloatingMenu,
  type MenuItem,
} from "@components/UI/FloatingMenu/FloatingMenu";

const LayerMenu2 = () => {
  const items: MenuItem[] = [
    {
      label: "Perfil",
      onClick: () => alert("Perfil"),
    },
    {
      label: "Configuración",
      submenu: [
        {
          label: "General",
          onClick: () => alert("General"),
        },
        {
          label: "Seguridad",
          onClick: () => alert("Seguridad"),
        },
      ],
    },
    {
      label: "Cerrar sesión",
      onClick: () => alert("Logout"),
    },
  ];

  return <FloatingMenu label="Hola" items={items} />;
};

export default LayerMenu2;
