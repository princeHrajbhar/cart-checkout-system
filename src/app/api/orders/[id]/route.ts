import {
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "@/controller/order.controller";

/**
 * GET → Get single order by ID
 * PATCH → Update order status
 * DELETE → Delete order
 */

export async function GET(req: Request, context: { params: { id: string } }) {
  return getOrderById(req, context);
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  return updateOrderStatus(req, context);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  return deleteOrder(req, context);
}
