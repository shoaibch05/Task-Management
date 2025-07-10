import React from "react";

export const DarkMode = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div>
      {" "}
      <button
        className="m-4 p-2 bg-gray-200 dark:bg-gray-700"
        onClick={() => setIsDark(!isDark)}
      >
        Toggle Theme
      </button>
    </div>
  );
};
