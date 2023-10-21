export function toggle(action) {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "");
  if (action) {
    localStorage.setItem(
      "theme",
      action === "light" ? "light" : action === "dark" ? "dark" : "remove",
    );

    if (localStorage.getItem("theme") === "remove")
      localStorage.removeItem("theme");
  } else {
    localStorage.removeItem("theme");
  }

  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function subscriber(callback) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    media.removeEventListener("change", callback);
  };
}
export function getSnapshot() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  return media.matches ? "dark" : "light";
}
