import { NextResponse } from "next/server";
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "@/service/order.service";
import { orderValidator } from "@/validator/order.validatore";

export const createOrder = async (req: Request) => {
  try {
    const body = await req.json();
    const validated = orderValidator.parse(body);

    // 🧠 All ID conversions handled in service — keep this clean
    const order = await createOrderService(validated);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
};

export const getOrders = async () => {
  try {
    const orders = await getAllOrdersService();
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const getOrderById = async (_req: Request, { params }: any) => {
  try {
    const { id } = params;
    const order = await getOrderByIdService(id);
    if (!order)
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const updateOrderStatus = async (req: Request, { params }: any) => {
  try {
    const { id } = params;
    const body = await req.json();
    const updated = await updateOrderStatusService(id, body.orderStatus);
    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const deleteOrder = async (_req: Request, { params }: any) => {
  try {
    const { id } = params;
    await deleteOrderService(id);
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
