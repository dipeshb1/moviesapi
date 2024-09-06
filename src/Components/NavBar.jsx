import Logo from "./Logo";

function NavBar({ children }) {
  return (
    <div className="nav-bar">
      <Logo />
      {children}
    </div>
  );
}

export default NavBar;
