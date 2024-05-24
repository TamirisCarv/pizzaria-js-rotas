import { Request, Response } from 'express';
import { ListFinishedOrdersService } from '../../services/order/ListFinishedOrdersService';

class ListFinishedOrdersController {
  async handle(req: Request, res: Response) {
    const { date } = req.query as { date: string };

    const listFinishedOrdersService = new ListFinishedOrdersService();

    try {
      const orders = await listFinishedOrdersService.execute({ date });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListFinishedOrdersController };
