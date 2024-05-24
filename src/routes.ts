import { Router } from 'express';

import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController} from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { RemoveItemController } from './controllers/item/RemoveItemController';
import { ListUnfinishedOrdersController } from './controllers/order/ListUnfinishedOrdersController';
import { ListFinishedOrdersController } from './controllers/order/ListFinishedOrdersController';
import { UpdateOrderStatusController } from './controllers/order/UpdateOrderStatusController';
import { CloseOrderController } from './controllers/order/CloseOrderController';


import uploadConfig from './config/multer';
import { CreateProductController } from './controllers/product/CreateProductController';
import { AddItemController } from './controllers/order/AddItemController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/deleteorder', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle);
router.get('/orders/unfinished', isAuthenticated, new ListUnfinishedOrdersController().handle);
router.get('/orders/finished', isAuthenticated, new ListFinishedOrdersController().handle);
router.put('/orders/finish', isAuthenticated, new UpdateOrderStatusController().handle);
router.put('/order/close', isAuthenticated, new CloseOrderController().handle);


export { router };