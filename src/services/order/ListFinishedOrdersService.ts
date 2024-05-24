import prismaClient from "../../prisma";

interface FinishedOrdersRequest {
  date: string;
}

class ListFinishedOrdersService {
  async execute({ date }: FinishedOrdersRequest) {
  
    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

   
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

   
    const orders = await prismaClient.pedido.findMany({
      where: {
        status: true,
        criado_em: {
          gte: targetDate,
          lt: nextDate,
        },
      },
    });

    return orders;
  }
}

export { ListFinishedOrdersService };
