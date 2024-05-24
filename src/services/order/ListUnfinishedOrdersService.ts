// ListUnfinishedOrdersService.ts

import prismaClient from "../../prisma";

interface UnfinishedOrdersRequest {
  date: string;
}

class ListUnfinishedOrdersService {
  async execute({ date }: UnfinishedOrdersRequest) {
  
    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

   
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    
    const orders = await prismaClient.pedido.findMany({
      where: {
        status: false, 
        criado_em: {
          gte: targetDate,
          lt: nextDate,
        },
      },
    });

    return orders;
  }
}

export { ListUnfinishedOrdersService };
