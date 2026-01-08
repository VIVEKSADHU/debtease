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
};

const initialDebts: Debt[] = [
  { id: "1", creditorName: "John Doe", amount: 150.00, dueDate: "2024-08-15T00:00:00.000Z", status: "Unpaid" },
  { id: "2", creditorName: "Jane Smith", amount: 300.50, dueDate: "2024-07-20T00:00:00.000Z", status: "Unpaid" },
  { id: "3", creditorName: "Sam Wilson", amount: 50.25, dueDate: "2024-06-30T00:00:00.000Z", status: "Paid" },
  { id: "4", creditorName: "Alice Brown", amount: 420.00, dueDate: "2024-08-01T00:00:00.000Z", status: "Unpaid" },
];

function DebtStatusBadge({ dueDate, status }: { dueDate: string; status: Debt['status'] }) {
  if (status === 'Paid') {
    return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge>;
  }
  const daysUntilDue = differenceInDays(parseISO(dueDate), new Date());
  if (daysUntilDue &lt; 0) {
    return &lt;Badge variant="destructive">Overdue&lt;/Badge>;
  }
  if (daysUntilDue &lt;= 7) {
    return &lt;Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600">Due Soon&lt;/Badge>;
  }
  return &lt;Badge variant="outline">Unpaid&lt;/Badge>;
}

export default function DebtsPage() {
  const [debts, setDebts] = useState&lt;Debt[]>(initialDebts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addDebt = (newDebt: Omit&lt;Debt, 'id' | 'status'>> => {
    setDebts(prev => [{ ...newDebt, id: Date.now().toString(), status: 'Unpaid' }, ...prev]);
  };

  const markAsPaid = (id: string) => {
    setDebts(debts.map(d => d.id === id ? { ...d, status: 'Paid' } : d));
  };
  
  const deleteDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  return (
    
      
        
          Add New Debt
        
      

      
        {debts.map((debt) => (
          
            
               
                 
                   {debt.creditorName}
                   Due: {format(parseISO(debt.dueDate), 'PPP')}
                 
                 
                  
                
               
              
                {debt.amount.toFixed(2)}
              
              
                
                  
                    
                      
                    
                    
                      {debt.status === 'Unpaid' && Mark as Paid}
                      Edit
                      Delete
                    
                  
                
              
            
          
        ))}
      
      {debts.length === 0 && (
         
            
              No debts found
              Add a new debt to get started.
          
      )}
      
    
  );
}
