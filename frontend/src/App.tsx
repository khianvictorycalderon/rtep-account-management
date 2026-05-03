import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";

export default function App() {

  // Theme initializer
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <div className="text-center space-y-4">
        <select
          defaultValue={getTheme()}
          onChange={(e) =>
            setTheme(e.target.value as "System" | "Light" | "Dark")
          }
          className="border px-3 py-2 rounded bg-white text-black dark:bg-zinc-800 dark:text-white"
        >
          <option value="System">System</option>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>

        <h1 className="text-2xl font-bold">Full-Stack Template</h1>
        <p className="text-lg italic text-gray-700 dark:text-gray-300">
          with React + Tailwind CSS + Express.js + PostgreSQL
        </p>
      </div>
    </div>
  );
}