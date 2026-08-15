"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AccountSidebar, AccountMobileNav } from "@/components/account/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/racun");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="container-luxury pt-28 pb-24 sm:pt-36">
      {/* Mobile navigation */}
      <div className="lg:hidden">
        <AccountMobileNav />
      </div>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16 xl:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <AccountSidebar />
        </div>

        {/* Page content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
