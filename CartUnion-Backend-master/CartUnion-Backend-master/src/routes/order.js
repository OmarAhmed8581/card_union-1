const { requireSignin, userMiddleware } = require("../common-middleware");
const { addOrder, getOrders, getOrder , getOrders1 , getAllOrders} = require("../controller/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.post("/getOrders", requireSignin, userMiddleware, getAllOrders);
router.post("/order/getAllOrders", getAllOrders);
router.get("/getOrders1", requireSignin, userMiddleware, getOrders1);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);

module.exports = router;
