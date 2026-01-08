import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, ShoppingCart, Home } from "lucide-react";

export default function DashboardPage() {
  // In a real app, these values would come from a database.
  const summaryData = {
    totalDebts: 5,
    debtAmount: 1250.75,
    marketItems: 8,
    restockItems: 3,
  };

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
            <div className="text-2xl font-bold">${summaryData.debtAmount.toFixed(2)}</div>
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
