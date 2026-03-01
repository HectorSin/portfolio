import type { Metadata } from "next";
import AdminStatsDashboard from "@/components/admin/admin-stats-dashboard";
import { isAdminAuthorizedFromCookies } from "@/lib/admin/auth";
import { getAdminOverview } from "@/lib/admin/overview";

export const metadata: Metadata = {
  title: "Admin Stats",
  description: "Admin analytics and chat logs overview",
};

export default async function AdminStatsPage() {
  const initiallyAuthorized = await isAdminAuthorizedFromCookies();
  const initialOverview = initiallyAuthorized ? await getAdminOverview().catch(() => null) : null;

  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <AdminStatsDashboard
        initialOverview={initialOverview}
        initiallyAuthorized={initiallyAuthorized}
      />
    </main>
  );
}
