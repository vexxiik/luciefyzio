"use client";
import { useEffect } from "react";

export function DisableLinks() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest("a");
      if (a) {
        e.preventDefault();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);
  return null;
}
