import { Request, Response } from 'express';
import { CloseOrderService } from '../../services/order/CloseOrderService';

class CloseOrderController {
  async handle(req: Request, res: Response) {
    const { id_pedido } = req.body;

    const closeOrderService = new CloseOrderService();

    try {
      const order = await closeOrderService.execute({ id_pedido });
      return res.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'error' });
      }
    }
  }
}

export { CloseOrderController };
