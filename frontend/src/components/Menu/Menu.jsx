import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Menu({ isOpen, onClick }) {
  return (
    <div onClick={onClick} className="md:hidden">
      {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
    </div>
  );
}

export default Menu;
