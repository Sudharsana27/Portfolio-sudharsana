import { navItems } from "../data.js";

export default function Header({ activeSection, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <a href="#home" className="logo" aria-label="Sudharsana home">
        S
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button className="theme-toggle" type="button" onClick={onToggleTheme}>
        <span aria-hidden="true">{theme === "dark" ? "*" : "o"}</span>
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </header>
  );
}
