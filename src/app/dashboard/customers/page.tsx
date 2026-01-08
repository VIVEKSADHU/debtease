
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddCustomerDialog } from "@/components/dashboard/add-customer-dialog";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { getCustomersCollection, getDebtsCollection } from "@/lib/firestore";
import type { Customer, Debt } from "@/lib/types";

export default function CustomersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const customersCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getCustomersCollection(firestore, user.uid);
  }, [firestore, user]);

  const { data: customers, loading: customersLoading } = useCollection<Customer>(customersCollection);

  const debtsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getDebtsCollection(firestore, user.uid);
  }, [firestore, user]);

  const { data: debts, loading: debtsLoading } = useCollection<Debt>(debtsCollection);

  const getCustomerTotalDebt = (customerId: string) => {
    if (!debts) return 0;
    return debts
      .filter(d => d.customerId === customerId && d.status === 'Unpaid')
      .reduce((acc, d) => acc + d.amount, 0);
  };
  
  const loading = customersLoading || debtsLoading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)} disabled={!firestore || !user}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {loading ? (
        <div className="text-center p-8">Loading customers...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customers && customers.map((customer) => (
              <Card key={customer.id}>
                <CardHeader>
                  <CardTitle>{customer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs. {getCustomerTotalDebt(customer.id).toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Total outstanding debt</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {customers && customers.length === 0 && (
             <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-lg font-semibold">No customers found</p>
                <p className="text-sm text-muted-foreground">Add a new customer to get started.</p>
            </div>
          )}
        </>
      )}
      <AddCustomerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
