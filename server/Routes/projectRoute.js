import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.ProjectCtrl.findAll);
router.get("/:id", indexCtrl.ProjectCtrl.findOne);
router.post("/", indexCtrl.ProjectCtrl.create);
// mengirim data ke proj_assignment
router.post(
  "/next/",
  indexCtrl.ProjectCtrl.createNext,
  indexCtrl.project_assignmentCtrl.create
);
router.put("/:id", indexCtrl.ProjectCtrl.update);
router.delete("/:id", indexCtrl.ProjectCtrl.deleted);
router.get("/sql/:id", indexCtrl.ProjectCtrl.querySQL);

export default router;
