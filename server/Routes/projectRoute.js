import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.ProjectCtrl.findAll);
router.get("/:id", indexCtrl.ProjectCtrl.findOne);
router.post("/", indexCtrl.ProjectCtrl.create);
router.put("/:id", indexCtrl.ProjectCtrl.update);
router.delete("/:id", indexCtrl.ProjectCtrl.deleted);

export default router;
