import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {

    handle = async (req: Request, res: Response) => {

        const { nome, preco, descricao, id_categoria } = req.body;

        if (!req.file) {
            throw new Error('A imagem do banner precisa ser informada!');
        } else {
            const { filename: banner } = req.file;

            const createProductService = new CreateProductService();
            const product = await createProductService.execute({ nome, preco, descricao, banner, id_categoria });

            return res.json(product);
        }

    }

}

export { CreateProductController };
