import React, { useState } from "react";
import ReactSwitch from "react-switch";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { toggleTheme } from "../redux/features/Theme";
import { useDispatch } from "react-redux";

const NavBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
  const onChecked = (checked) => {
    setChecked(checked);
    dispatch(toggleTheme());
  };

  const altTheme = theme === "light" ? "dark" : "light";

  return (
    <header className="p-0">
      <Navbar color={altTheme} {...altTheme} expand="md" fixed="top">
        <NavbarBrand href="/home">SMORT TRAVEL PLANNER</NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home">Plan Trip</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/home">View Blogs</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto d-flex align-items-center" navbar>
            <NavbarText className="mx-3">Toggle Theme</NavbarText>
            <ReactSwitch
              aria-labelledby="Toggle theme"
              checked={checked}
              onChange={onChecked}
              onColor="#595959"
              onHandleColor="#191A1A"
              handleDiameter={24}
              uncheckedIcon={false}
              checkedIcon={false}
              width={48}
              height={20}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavBar;
