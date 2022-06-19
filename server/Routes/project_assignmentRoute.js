import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.project_assignmentCtrl.findAll);
router.get("/:id", indexCtrl.project_assignmentCtrl.findOne);
router.post("/", indexCtrl.project_assignmentCtrl.create);
router.put("/", indexCtrl.project_assignmentCtrl.update);
router.delete("/", indexCtrl.project_assignmentCtrl.deleted);

router.get("/sql/:id", indexCtrl.project_assignmentCtrl.querySQL);

export default router;
