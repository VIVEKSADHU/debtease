
export type Customer = {
  id: string;
  name: string;
  userId: string;
};

export type Debt = {
  id: string;
  creditorName: string;
  customerId: string;
  amount: number;
  dueDate: string; // ISO string format
  status: "Paid" | "Unpaid";
  notes?: string;
  userId: string;
};

export type MarketItem = {
  id: string;
  name: string;
  checked: boolean;
  userId: string;
  createdAt: string; // ISO string format
};

export type RestockItem = {
  id: string;
  name: string;
  checked: boolean;
  userId: string;
  createdAt: string; // ISO string format
};
