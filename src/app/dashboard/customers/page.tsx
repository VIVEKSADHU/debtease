
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddCustomerDialog } from "@/components/dashboard/add-customer-dialog";

type Customer = {
  id: string;
  name: string;
};

type Debt = {
  id: string;
  creditorName: string;
  amount: number;
  status: "Paid" | "Unpaid";
};

const initialCustomers: Customer[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Sam Wilson" },
    { id: "4", name: "Alice Brown" },
];

const initialDebts: Debt[] = [
    { id: "1", creditorName: "John Doe", amount: 150.00, status: "Unpaid" },
    { id: "2", creditorName: "Jane Smith", amount: 300.50, status: "Unpaid" },
    { id: "3", creditorName: "Sam Wilson", amount: 50.25, status: "Paid" },
    { id: "4", creditorName: "John Doe", amount: 420.00, status: "Unpaid" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addCustomer = (name: string) => {
    const newCustomer = { id: Date.now().toString(), name };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const getCustomerTotalDebt = (customerName: string) => {
    return debts
      .filter(d => d.creditorName === customerName && d.status === 'Unpaid')
      .reduce((acc, d) => acc + d.amount, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {getCustomerTotalDebt(customer.name).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total outstanding debt</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {customers.length === 0 && (
         <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-lg font-semibold">No customers found</p>
            <p className="text-sm text-muted-foreground">Add a new customer to get started.</p>
        </div>
      )}
      <AddCustomerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddCustomer={addCustomer} />
    </div>
  );
}
