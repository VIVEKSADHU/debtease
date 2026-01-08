
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { AddCustomerDialog } from "./add-customer-dialog";
import type { Customer } from "@/lib/types";
import { useUser, useFirestore } from "@/firebase";
import { addDebt as addDebtToDb, addCustomer as addCustomerToDb } from "@/lib/firestore";

const formSchema = z.object({
  customerId: z.string().min(1, { message: "Customer is required." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  dueDate: z.string().min(1, { message: "A due date is required." }),
  notes: z.string().optional(),
});


type AddDebtDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customers: Customer[];
};

export function AddDebtDialog({ open, onOpenChange, customers }: AddDebtDialogProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      amount: 0,
      dueDate: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const customer = customers.find(c => c.id === values.customerId);
    if (!customer || !firestore || !user) return;

    try {
        await addDebtToDb(firestore, user.uid, {
            ...values,
            creditorName: customer.name,
            dueDate: new Date(values.dueDate),
        });
        toast({
            title: "Debt Added!",
            description: `A new debt for ${customer.name} has been added.`,
        });
        form.reset();
        onOpenChange(false);
    } catch(e) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem adding the debt.",
        });
    }
  }

  const handleAddNewCustomer = () => {
    setIsAddingCustomer(true);
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Debt</DialogTitle>
          <DialogDescription>
            Enter the details of the debt below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => { field.onChange(value); setSelectedCustomerId(value); }} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="icon" onClick={handleAddNewCustomer}>
                      <PlusCircle className="h-4 w-4"/>
                  </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (Rs.)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (list of items)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., List of items taken..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Debt</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    <AddCustomerDialog 
        open={isAddingCustomer} 
        onOpenChange={setIsAddingCustomer} 
        onCustomerAdded={(newCustomerId) => {
            if(customers.find(c => c.id === newCustomerId)) {
                setSelectedCustomerId(newCustomerId);
                form.setValue('customerId', newCustomerId);
            }
        }}
    />
    </>
  );
}
