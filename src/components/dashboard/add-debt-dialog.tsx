"use client";

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
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  creditorName: z.string().min(1, { message: "Creditor name is required." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  dueDate: z.date({ required_error: "A due date is required." }),
});

type FormValues = z.infer<typeof formSchema>;

type AddDebtDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDebt: (debt: Omit<FormValues, 'id'>) => void;
};

export function AddDebtDialog({ open, onOpenChange, onAddDebt }: AddDebtDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creditorName: "",
      amount: 0,
    },
  });

  function onSubmit(values: FormValues) {
    const debtData = {
      ...values,
      dueDate: values.dueDate.toISOString(),
    };
    onAddDebt(debtData);
    toast({
      title: "Debt Added!",
      description: `${values.creditorName} has been added to your list.`,
    });
    form.reset();
    onOpenChange(false);
  }

  return (
    
      
        
          
            Add New Debt
            Enter the details of the debt below. Click save when you&apos;re done.
          
        
        
          
            
              
                Creditor Name
                
                  
                
                
              
            
            
              
                Amount ($)
                
                  
                
                
              
            
            
              
                Due Date
                
                  
                    
                      
                        
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            Pick a date
                          )}
                          
                        
                      
                    
                    
                      
                        
                          
                            
                            disabled={(date) => date &lt; new Date(new Date().setHours(0,0,0,0))}
                            initialFocus
                          
                        
                      
                    
                  
                  
                
              
            
            
              
                Cancel
                Save Debt
              
            
          
        
      
    
  );
}
