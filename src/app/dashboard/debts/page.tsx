
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { AddDebtDialog } from "@/components/dashboard/add-debt-dialog";
import { format, differenceInDays } from 'date-fns';
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { getCustomersCollection, getDebtsCollection, updateDebtStatus, deleteDebt as deleteDebtFromDb } from "@/lib/firestore";
import type { Customer, Debt } from "@/lib/types";

function DebtStatusBadge({ dueDate, status }: { dueDate: string; status: Debt['status'] }) {
  if (status === 'Paid') {
    return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>;
  }
  const daysUntilDue = differenceInDays(new Date(dueDate), new Date());
  if (daysUntilDue < 0) {
    return <Badge variant="destructive">Overdue</Badge>;
  }
  if (daysUntilDue <= 7) {
    return <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600">Due Soon</Badge>;
  }
  return <Badge variant="outline">Unpaid</Badge>;
}

export default function DebtsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const debtsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getDebtsCollection(firestore, user.uid);
  }, [firestore, user]);

  const { data: debts, loading: debtsLoading } = useCollection<Debt>(debtsCollection);

  const customersCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return getCustomersCollection(firestore, user.uid);
  }, [firestore, user]);

  const { data: customers, loading: customersLoading } = useCollection<Customer>(customersCollection);

  const markAsPaid = (id: string) => {
    if (!firestore || !user) return;
    updateDebtStatus(firestore, user.uid, id, 'Paid');
  };
  
  const deleteDebt = (id: string) => {
    if (!firestore || !user) return;
    deleteDebtFromDb(firestore, user.uid, id);
  };
  
  const loading = debtsLoading || customersLoading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)} disabled={!firestore || !user}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Debt
        </Button>
      </div>

       {loading ? (
        <div className="text-center p-8">Loading debts...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {debts && debts.map((debt) => (
              <Card key={debt.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg font-medium">{debt.creditorName}</CardTitle>
                    <CardDescription>Due: {format(new Date(debt.dueDate), 'PPP')}</CardDescription>
                  </div>
                  <DebtStatusBadge dueDate={debt.dueDate} status={debt.status} />
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold">Rs. {debt.amount.toFixed(2)}</div>
                  {debt.notes && <p className="text-sm text-muted-foreground mt-2">{debt.notes}</p>}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          {debt.status === 'Unpaid' && <DropdownMenuItem onClick={() => markAsPaid(debt.id)}>Mark as Paid</DropdownMenuItem>}
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteDebt(debt.id)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
          {debts && debts.length === 0 && (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <p className="text-lg font-semibold">No debts found</p>
                <p className="text-sm text-muted-foreground">Add a new debt to get started.</p>
            </div>
          )}
        </>
      )}
      <AddDebtDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        customers={customers || []}
      />
    </div>
  );
}
