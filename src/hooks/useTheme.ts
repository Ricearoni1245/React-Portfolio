import { useEffect, useState } from "react";


export type ThemeKey = "a" | "b" | "c" | "d" | "e";


export function useTheme() {
const [theme, setTheme] = useState<ThemeKey>(() => {
const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as ThemeKey | null;
return saved ?? "a";
});


useEffect(() => {
document.documentElement.setAttribute("data-theme", theme);
localStorage.setItem("theme", theme);
}, [theme]);


return { theme, setTheme };
}