import { Request, Response } from "express";
import { GetProductImageService } from "../../services/product/GetProductImageService";
import {resolve} from "path";

class GetProductImageController{
    handle = async (req:Request, res:Response) => {

        const product_id=req.query.product_id as string;

        const service = new GetProductImageService();

        const banner = await service.execute(product_id);

        return res.sendFile(resolve(__dirname,'..','..', '..', 'tmp/' + banner));
    };
}

export {GetProductImageController}