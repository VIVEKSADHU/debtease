"use client";

import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet, ShoppingCart, Home as HomeIcon } from "lucide-react";
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function RedirectIfAuthenticated() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return null;
}

export default function LandingPage() {
  const { user, loading } = useUser();

  const heroImage = PlaceHolderImages.find(p => p.id === "1");

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <RedirectIfAuthenticated />
      <div className="flex min-h-screen flex-col">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              DebtEase
            </Link>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
              <span className="block">Simplify your finances</span>
              <span className="block text-primary">and home management</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              One simple app to track debts and manage your home inventory. Stay organized, save money, and reduce stress.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </section>

          <section className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-sm text-muted-foreground">FEATURES</span>
            </div>
          </section>


          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Track Debts Seamlessly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Easily record and manage money owed to you. Set due dates, track payments, and never lose sight of your finances.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Organize Your Shopping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create a smart market checklist. Add items you need to buy and check them off as you shop.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HomeIcon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 font-headline">Manage Home Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep track of what needs restocking at home. From pantry staples to cleaning supplies, always know what you have.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-6 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DebtEase &amp; HomeStock. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
