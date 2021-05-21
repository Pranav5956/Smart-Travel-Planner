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
import { selectUser, unsetUser } from "../redux/features/Auth";
import { useSelector, useDispatch } from "react-redux";
import { FaHome } from "react-icons/fa";

const NavBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
  const onChecked = (checked) => {
    setChecked(checked);
    dispatch(toggleTheme());
  };
  const logout = () => {
    dispatch(unsetUser());
  };

  const altTheme = theme === "light" ? "dark" : "light";

  return (
    <header className="p-0">
      <Navbar color={altTheme} {...altTheme} expand="md" fixed="top">
        <NavbarBrand href="/home">
          <FaHome />
        </NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/blogs">Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/itineraries">Itineraries</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto d-flex align-items-center" navbar>
            {user ? (
              <>
                <NavbarText className="pr-3">{`Signed in as ${user.username}`}</NavbarText>
                <NavItem className="pr-4">
                  <NavLink href="/home" onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login" className="pr-4">
                    Login
                  </NavLink>
                </NavItem>
              </>
            )}
            {/* <ReactSwitch
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
              title="Toggle Theme"
            /> */}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavBar;
