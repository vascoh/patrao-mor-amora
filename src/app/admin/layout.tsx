import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { getServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = getServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Sem user → ainda assim mostramos children, mas o middleware
  // já deve ter feito redirect; mantemos simples para a página /admin/login.
  if (!user) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <AdminNav email={user.email ?? null} />
      <main className="flex-1 p-8 md:p-10">{children}</main>
    </div>
  );
}
