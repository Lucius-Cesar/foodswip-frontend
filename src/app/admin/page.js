"use client";
import useCheckAuth from "@/hooks/useCheckAuth";
import useRefreshAuth from "@/hooks/useRefreshAuth";

export default function admin() {
  useRefreshAuth();
  useCheckAuth();
}
