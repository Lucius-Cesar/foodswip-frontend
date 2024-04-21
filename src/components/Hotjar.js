"use client";

import useHotjar from "@/hooks/useHotjar";

export default function Hotjar({ children }) {
  useHotjar();

  return children;
}
