
"use client";

import { ItemList } from "@/components/dashboard/item-list";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { getItemsCollection, addItem, toggleItem, deleteItem, deleteCheckedItems } from "@/lib/firestore";
import type { MarketItem } from "@/lib/types";
import { orderBy, query } from "firebase/firestore";

export default function MarketChecklistPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const itemsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(getItemsCollection(firestore, user.uid, "market-items"), orderBy("createdAt", "desc"));
  }, [firestore, user]);

  const { data: items, loading } = useCollection<MarketItem>(itemsCollection);

  const handleAddItem = (name: string) => {
    if (firestore && user) {
      addItem(firestore, user.uid, "market-items", name);
    }
  };

  const handleToggleItem = (id: string, checked: boolean) => {
    if (firestore && user) {
      toggleItem(firestore, user.uid, "market-items", id, checked);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (firestore && user) {
      deleteItem(firestore, user.uid, "market-items", id);
    }
  };
  
  const handleRemoveChecked = () => {
    if (firestore && user) {
        deleteCheckedItems(firestore, user.uid, "market-items");
    }
  };


  return (
    <ItemList
      title="What to buy from the market?"
      items={items}
      loading={loading}
      onAddItem={handleAddItem}
      onToggleItem={handleToggleItem}
      onRemoveItem={handleRemoveItem}
      onRemoveChecked={handleRemoveChecked}
      inputPlaceholder="e.g., Fresh tomatoes"
      emptyStateText="Your shopping list is empty. Add items you need to buy."
    />
  );
}
