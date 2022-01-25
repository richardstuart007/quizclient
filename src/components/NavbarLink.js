import React from "react";
import { Link } from "react-router-dom";
const NavbarLink = ({ form, link_to, link_name, link_form, setForm }) => {
  //
  //  Disable current form in Nav bar (1 iteration behind !)
  //
  let classNameList = "";
  classNameList =
    form === link_form ? classNameList + " disabled" : classNameList + " link";
  //
  //  Output link
  //
  return (
    <Link
      className={classNameList}
      to={link_to}
      onClick={() => setForm(link_form)}
    >
      {link_name}
    </Link>
  );
};

export default NavbarLink;
