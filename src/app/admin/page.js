"use client";
import useCheckAuth from "@/hooks/useCheckAuth";
import useRefreshAuth from "@/hooks/useRefreshAuth";
import { useRouter } from "next/navigation";

export default function admin() {
  const router = useRouter();
  router.push("/admin/login");
}
