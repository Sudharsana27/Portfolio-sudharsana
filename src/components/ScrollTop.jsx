export default function ScrollTop({ visible }) {
  return (
    <button
      className={`scroll-top ${visible ? "show" : ""}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      ^
    </button>
  );
}
