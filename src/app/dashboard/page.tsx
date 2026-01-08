
"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, ShoppingCart, Home } from "lucide-react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { getDebtsCollection, getItemsCollection } from "@/lib/firestore";
import type { Debt, MarketItem, RestockItem } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const debtsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getDebtsCollection(firestore, user.uid);
  }, [firestore, user]);

  const { data: debts, loading: debtsLoading } = useCollection<Debt>(debtsCollection);

  const marketItemsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getItemsCollection(firestore, user.uid, "market-items");
  }, [firestore, user]);

  const { data: marketItems, loading: marketItemsLoading } = useCollection<MarketItem>(marketItemsCollection);

  const restockItemsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getItemsCollection(firestore, user.uid, "restock-items");
  }, [firestore, user]);

  const { data: restockItems, loading: restockItemsLoading } = useCollection<RestockItem>(restockItemsCollection);

  const summaryData = useMemo(() => {
    const unpaidDebts = debts?.filter(d => d.status === 'Unpaid') || [];
    const totalDebtAmount = unpaidDebts.reduce((acc, debt) => acc + debt.amount, 0);
    
    return {
      totalDebts: unpaidDebts.length,
      debtAmount: totalDebtAmount,
      marketItems: marketItems?.length || 0,
      restockItems: restockItems?.length || 0,
    };
  }, [debts, marketItems, restockItems]);

  const loading = debtsLoading || marketItemsLoading || restockItemsLoading;

  if (loading) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome Back!</h2>
                <p className="text-muted-foreground">Here&apos;s a quick overview of your activities.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Outstanding Debt
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Loading...</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Market Checklist</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Loading...</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Home Restock List</CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Loading...</div>
                    </CardContent>
                </Card>
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome Back!</h2>
        <p className="text-muted-foreground">Here&apos;s a quick overview of your activities.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Outstanding Debt
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {summaryData.debtAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              from {summaryData.totalDebts} customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Checklist</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.marketItems} items</div>
            <p className="text-xs text-muted-foreground">
              to purchase on your next trip
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home Restock List</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.restockItems} items</div>
            <p className="text-xs text-muted-foreground">
              running low at home
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
