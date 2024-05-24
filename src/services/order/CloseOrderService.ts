
import prismaClient from "../../prisma";

interface CloseOrderRequest {
  id_pedido: string;
}

class CloseOrderService {
  async execute({ id_pedido }: CloseOrderRequest) {
    const order = await prismaClient.pedido.findUnique({
      where: {
        id: id_pedido,
      },
      include: {
        items: {
          include: {
            Produto: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Pedido não encontrado");
    }

    const total = order.items.reduce((acc, item) => {
      if (item.Produto) {
        const itemTotal = item.quantidade * parseFloat(item.Produto.preco);
        return acc + itemTotal;
      } else {
        return acc;
      }
    }, 0);

    const updatedOrder = await prismaClient.pedido.update({
      where: {
        id: id_pedido,
      },
      data: {
        status: true,
        atualizado_em: new Date(),
      },
      include: {
        items: {
          include: {
            Produto: true,
          },
        },
      },
    });

    return {
      ...updatedOrder,
      total,
    };
  }
}

export { CloseOrderService };
