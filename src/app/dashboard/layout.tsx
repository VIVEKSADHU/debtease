"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  LayoutGrid,
  Wallet,
  ShoppingCart,
  Home,
  Bell,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/dashboard/user-nav';

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className="w-full justify-start"
      >
        <span className="mr-2">{icon}</span>
        {children}
      </Button>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/debts':
        return 'Debt Tracker';
      case '/dashboard/customers':
        return 'Customers';
      case '/dashboard/market-checklist':
        return 'Market Checklist';
      case '/dashboard/restock':
        return 'Home Restock';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col gap-4 px-4 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-full items-center gap-2 rounded-md px-3 text-lg font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary transition-all group-hover:scale-110"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <span>DebtEase</span>
          </Link>
          <NavLink href="/dashboard" icon={<LayoutGrid className="h-4 w-4" />}>Dashboard</NavLink>
          <NavLink href="/dashboard/debts" icon={<Wallet className="h-4 w-4" />}>Debts</NavLink>
          <NavLink href="/dashboard/customers" icon={<Users className="h-4 w-4" />}>Customers</NavLink>
          <NavLink href="/dashboard/market-checklist" icon={<ShoppingCart className="h-4 w-4" />}>Market List</NavLink>
          <NavLink href="/dashboard/restock" icon={<Home className="h-4 w-4" />}>Restock List</NavLink>
        </nav>
        <div className="mt-auto p-4">
          <UserNav />
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-semibold font-headline">{getPageTitle()}</h1>
          <div className="relative ml-auto flex-1 md:grow-0">
             {/* Future search bar */}
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
