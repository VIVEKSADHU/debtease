
"use client";

import { useState } from "react";
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
import { format, differenceInDays, parseISO } from 'date-fns';


type Debt = {
  id: string;
  creditorName: string;
  amount: number;
  dueDate: string; // ISO string format
  status: "Paid" | "Unpaid";
  notes?: string;
};

const initialDebts: Debt[] = [
  { id: "1", creditorName: "John Doe", amount: 150.00, dueDate: "2024-08-15T00:00:00.000Z", status: "Unpaid", notes: "Borrowed for groceries." },
  { id: "2", creditorName: "Jane Smith", amount: 300.50, dueDate: "2024-07-20T00:00:00.000Z", status: "Unpaid" },
  { id: "3", creditorName: "Sam Wilson", amount: 50.25, dueDate: "2024-06-30T00:00:00.000Z", status: "Paid", notes: "Repaid loan for coffee." },
  { id: "4", creditorName: "Alice Brown", amount: 420.00, dueDate: "2024-08-01T00:00:00.000Z", status: "Unpaid", notes: "Emergency fund." },
];

function DebtStatusBadge({ dueDate, status }: { dueDate: string; status: Debt['status'] }) {
  if (status === 'Paid') {
    return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>;
  }
  const daysUntilDue = differenceInDays(parseISO(dueDate), new Date());
  if (daysUntilDue < 0) {
    return <Badge variant="destructive">Overdue</Badge>;
  }
  if (daysUntilDue <= 7) {
    return <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600">Due Soon</Badge>;
  }
  return <Badge variant="outline">Unpaid</Badge>;
}

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addDebt = (newDebt: Omit<Debt, 'id' | 'status'>) => {
    setDebts(prev => [{ ...newDebt, id: Date.now().toString(), status: 'Unpaid' }, ...prev]);
  };

  const markAsPaid = (id: string) => {
    setDebts(debts.map(d => d.id === id ? { ...d, status: 'Paid' } : d));
  };
  
  const deleteDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Debt
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {debts.map((debt) => (
          <Card key={debt.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
               <div>
                 <CardTitle className="text-lg font-medium">{debt.creditorName}</CardTitle>
                 <CardDescription>Due: {format(parseISO(debt.dueDate), 'PPP')}</CardDescription>
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
      {debts.length === 0 && (
         <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-lg font-semibold">No debts found</p>
            <p className="text-sm text-muted-foreground">Add a new debt to get started.</p>
        </div>
      )}
      <AddDebtDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddDebt={addDebt} />
    </div>
  );
}
