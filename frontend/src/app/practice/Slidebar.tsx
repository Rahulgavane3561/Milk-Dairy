import './suppierprofilr.css'; // Import your CSS file here if you have external styles

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BiBarChart, BiCalendar, BiChart, BiChat, BiCog, BiFolder, BiSearch, BiUser } from "react-icons/bi";

import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard", icon: <BiBarChart /> },
    { title: "Inbox", icon: <BiChat /> },
    { title: "Accounts", icon: <BiUser />, gap: true },
    { title: "Schedule", icon: <BiCalendar /> },
    { title: "Search", icon: <BiSearch /> },
    { title: "Analytics", icon: <BiChart /> },
    { title: "Files", icon: <BiFolder />, gap: true },
    { title: "Setting", icon: <BiCog /> },
  ];

  return (
  
    <div className={`flex-1 bg-dark-purple p-3 pt-4 relative ${open ? "w-25vw col-md-3" : "w-20"}`}>
      <div className="flex items-center mb-4">
        <button
          className="btn btn-outline-light d-md-none me-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <h1 className={`text-white ml-3 text-xl ${!open && "d-none d-md-block"}`}>
          Designers
        </h1>
      </div>
      <ul className="list-unstyled">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`p-3 cursor-pointer ${index === 0 && "bg-light-white text-dark-purple"} ${Menu.gap ? "mt-2 mt-md-9" : "mt-2"
              }`}
          >
            <div className="d-flex align-items-center">
              {Menu.icon}
              <span className={`${!open && "visually-hidden"} ms-2`}>{Menu.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
    // </div>
  );
};

export default App;
