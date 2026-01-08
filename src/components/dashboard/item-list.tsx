"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  checked: boolean;
};

type ItemListProps = {
  title: string;
  initialItems: Item[];
  inputPlaceholder: string;
  emptyStateText: string;
};

export function ItemList({ title, initialItems, inputPlaceholder, emptyStateText }: ItemListProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [newItemName, setNewItemName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() === "") return;
    const newItem: Item = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      checked: false,
    };
    setItems([newItem, ...items]);
    setNewItemName("");
  };

  const handleToggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  const handleRemoveChecked = () => {
    setItems(items.filter((item) => !item.checked));
  };

  const checkedCount = items.filter(item => item.checked).length;

  return (
    
      
        
          {title}
          
            
              
              
            
            
              
            
          
        
        {items.length > 0 ? (
          
            {items.map((item) => (
              
                
                  
                  
                  {item.name}
                
                
                  
                    
                  
                
              
            ))}
          
        ) : (
          
            
              {emptyStateText}
            
          
        )}
        {checkedCount > 0 && (
          
            
              Remove {checkedCount} checked item(s)
            
          
        )}
      
    
  );
}
