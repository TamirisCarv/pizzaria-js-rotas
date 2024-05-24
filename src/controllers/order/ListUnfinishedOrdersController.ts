// ListUnfinishedOrdersController.ts

import { Request, Response } from 'express';
import { ListUnfinishedOrdersService } from '../../services/order/ListUnfinishedOrdersService';

class ListUnfinishedOrdersController {
  async handle(req: Request, res: Response) {
    const { date } = req.query as { date: string };

    const listUnfinishedOrdersService = new ListUnfinishedOrdersService();

    try {
      const orders = await listUnfinishedOrdersService.execute({ date });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListUnfinishedOrdersController };
