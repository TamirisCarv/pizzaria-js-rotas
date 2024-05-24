import { Request, Response } from 'express';
import { UpdateOrderStatusService } from '../../services/order/UpdateOrderStatusService';

class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    const { id_pedido } = req.body;

    const updateOrderStatusService = new UpdateOrderStatusService();

    try {
      const order = await updateOrderStatusService.execute({ id_pedido });
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { UpdateOrderStatusController };
