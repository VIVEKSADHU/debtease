import { ItemList } from "@/components/dashboard/item-list";

const initialRestockItems = [
  { id: "1", name: "Paper Towels", checked: false },
  { id: "2", name: "Dish Soap", checked: false },
  { id: "3", name: "Coffee Beans", checked: true },
];

export default function RestockPage() {
  return (
    <ItemList
      title="What to restock at home?"
      initialItems={initialRestockItems}
      inputPlaceholder="e.g., Toothpaste"
      emptyStateText="Your restock list is empty. Add items that are running low."
    />
  );
}
