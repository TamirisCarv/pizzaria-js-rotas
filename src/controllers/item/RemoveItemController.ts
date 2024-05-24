

import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/item/RemoveItemService';

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const { id_item } = req.query as { id_item: string };

    const removeItemService = new RemoveItemService();

    try {
      const item = await removeItemService.execute({ id_item });
      return res.json(item);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { RemoveItemController };
