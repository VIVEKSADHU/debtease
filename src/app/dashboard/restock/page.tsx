
"use client";

import { ItemList } from "@/components/dashboard/item-list";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { getItemsCollection, addItem, toggleItem, deleteItem, deleteCheckedItems } from "@/lib/firestore";
import type { RestockItem } from "@/lib/types";
import { orderBy, query } from "firebase/firestore";

export default function RestockPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const itemsCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(getItemsCollection(firestore, user.uid, "restock-items"), orderBy("createdAt", "desc"));
  }, [firestore, user]);

  const { data: items, loading } = useCollection<RestockItem>(itemsCollection);

  const handleAddItem = (name: string) => {
    if (firestore && user) {
      addItem(firestore, user.uid, "restock-items", name);
    }
  };

  const handleToggleItem = (id: string, checked: boolean) => {
    if (firestore && user) {
      toggleItem(firestore, user.uid, "restock-items", id, checked);
    }
  };

  const handleRemoveItem = (id: string) => {
    if (firestore && user) {
      deleteItem(firestore, user.uid, "restock-items", id);
    }
  };

  const handleRemoveChecked = () => {
      if (firestore && user) {
          deleteCheckedItems(firestore, user.uid, "restock-items");
      }
  };

  return (
    <ItemList
      title="What to restock at home?"
      items={items}
      loading={loading}
      onAddItem={handleAddItem}
      onToggleItem={handleToggleItem}
      onRemoveItem={handleRemoveItem}
      onRemoveChecked={handleRemoveChecked}
      inputPlaceholder="e.g., Toothpaste"
      emptyStateText="Your restock list is empty. Add items that are running low."
    />
  );
}
