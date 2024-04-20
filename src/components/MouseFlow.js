"use client";

import useMouseFlow from "@/hooks/useMouseFlow";

export default function MouseFlow({ children }) {
  useMouseFlow();

  return children;
}
