
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
