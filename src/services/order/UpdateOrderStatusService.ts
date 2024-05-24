import prismaClient from "../../prisma";

interface UpdateOrderStatusRequest {
  id_pedido: string;
}

class UpdateOrderStatusService {
  async execute({ id_pedido }: UpdateOrderStatusRequest) {
    const order = await prismaClient.pedido.update({
      where: {
        id: id_pedido,
      },
      data: {
        status: true,
        atualizado_em: new Date(),
      },
    });

    return order;
  }
}

export { UpdateOrderStatusService };
