export type OrderItemRecord = {
  id: number;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
};

export type OrderRecord = {
  id: number;
  created_at: string;
  status: string;
  total_amount: number;
  full_name: string;
  phone: string;
  email: string;
  delivery_method: string;
  notes: string;
  order_items: OrderItemRecord[];
};

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("en-UG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatOrderStatus(status: string) {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1);
}
