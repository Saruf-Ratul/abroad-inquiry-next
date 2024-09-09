"use client";
import { CollapseDrawerProvider } from "@/contexts/CollapseDrawerContext";
import DashboardLayout from "@/layouts/dashboard";

export default function RootLayout({ children }) {
  return (
    <>
      <CollapseDrawerProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </CollapseDrawerProvider>
    </>
  );
}
