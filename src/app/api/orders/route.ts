import { createOrder, getOrders } from "@/controller/order.controller";

export async function GET() {
  return getOrders();
}

export async function POST(req: Request) {
  return createOrder(req);
}
