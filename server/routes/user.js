import express from "express";
import userController from "../controller/user.js";
import admController from "../controller/adm.js";
import orderController from "../controller/order.js"
import CommonDetailsController from "../controller/common.js";
import ProductController from "../controller/productdata.js";




const router = express.Router();

//userdata
router.post("/usercreate", userController.createUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/login", userController.loginAuth);
router.post("/logout", userController.logout);

router.get("/users/single/:id", userController.getSingleUser);

router.post("/common", CommonDetailsController.createDetails);
router.post("/login_common", CommonDetailsController.LoginData);
 router.post("/userdetails", CommonDetailsController.getAllUsers);

//admindata
router.get("/adm", admController.getAlladm);
router.post("/admin", admController.createadm);
router.post("/login", admController.loginAuth);

 //order
router.post("/order",orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/email", orderController.emailverify);
router.get("/orders/name", orderController.searchOrderByUsername);

//products
router.post("/productssave",ProductController.createProduct);
router.get("/productdata",ProductController.getAllProducts);
router.get("/productdata/:id",ProductController.getsingleProduct);



export default router;
