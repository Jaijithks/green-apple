import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Green Apple Catering",
  description: "Secure CMS Admin Management Portal for Green Apple Catering & Event Company.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
