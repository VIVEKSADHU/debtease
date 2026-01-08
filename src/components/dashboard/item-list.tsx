"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <form onSubmit={handleAddItem} className="flex w-full items-center space-x-2 pt-4">
          <Input
            ref={inputRef}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={inputPlaceholder}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Item</span>
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-2",
                  item.checked && "bg-muted"
                )}
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onCheckedChange={() => handleToggleItem(item.id)}
                />
                <label
                  htmlFor={`item-${item.id}`}
                  className={cn(
                    "flex-1 cursor-pointer text-sm font-medium",
                    item.checked && "text-muted-foreground line-through"
                  )}
                >
                  {item.name}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-sm text-muted-foreground">{emptyStateText}</p>
          </div>
        )}
      </CardContent>
      {checkedCount > 0 && (
        <CardFooter className="border-t pt-4">
          <Button variant="outline" size="sm" onClick={handleRemoveChecked}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove {checkedCount} checked item(s)
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
