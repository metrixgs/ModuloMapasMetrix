import { Navbar, NavbarBrand } from "flowbite-react";

import ThemeToggle from "@components/ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <header>
      <Navbar fluid>
        <NavbarBrand>
          <img src="/logo-alt.webp" alt="METRIX logo" className="ml-8 h-6 sm:h-9" />
        </NavbarBrand>
        <div className="h-9 flex mr-8">
          <ThemeToggle />
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
