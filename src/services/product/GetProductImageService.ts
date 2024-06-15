import prismaClient from "../../prisma"

class GetProductImageService {

    execute = async (product_id:string) => {

    const product = await prismaClient.produto.findFirst({
        where:{
            id:product_id
        }
    });

    return product?.banner;
    }
}

export {GetProductImageService}