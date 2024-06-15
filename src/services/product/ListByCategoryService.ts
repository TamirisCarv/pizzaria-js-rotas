import prismaClient from "../../prisma";

interface ProductRequest{
    id_categoria: string;
}

class ListByCategoryService{
 async execute({id_categoria}:ProductRequest) {
const product= await prismaClient.produto.findMany({
    where:{
        id_categoria:id_categoria
    }
})

return product.map(p => {
    return {
                ...p,
                url: 'http://localhost:3333/product/image?product_id=' +p.id
    }
});
 }
}

export {ListByCategoryService}