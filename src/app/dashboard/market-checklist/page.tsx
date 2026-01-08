import { ItemList } from "@/components/dashboard/item-list";

const initialMarketItems = [
  { id: "1", name: "Milk", checked: false },
  { id: "2", name: "Bread", checked: true },
  { id: "3", name: "Eggs", checked: false },
  { id: "4", name: "Apples", checked: false },
  { id: "5", name: "Chicken Breast", checked: false },
];

export default function MarketChecklistPage() {
  return (
    <ItemList
      title="What to buy from the market?"
      initialItems={initialMarketItems}
      inputPlaceholder="e.g., Fresh tomatoes"
      emptyStateText="Your shopping list is empty. Add items you need to buy."
    />
  );
}
