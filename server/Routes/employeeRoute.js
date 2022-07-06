import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import uplodDownload from "../../middleware/uplodDownload";

const router = Router();

router.get("/", indexCtrl.EmployeeCtrl.findAll);
router.get("/:id", indexCtrl.EmployeeCtrl.findOne);
router.post("/", uplodDownload.uploadFiles, indexCtrl.EmployeeCtrl.create);
router.post("/", indexCtrl.EmployeeCtrl.create);
// untuk menghubungkan dengan dependent
router.post(
  "/next/",
  indexCtrl.EmployeeCtrl.createNext,
  indexCtrl.DependentCtrl.create
);
router.put("/:id", indexCtrl.EmployeeCtrl.update);
router.delete("/:id", indexCtrl.EmployeeCtrl.deleted);
router.get("/sql/:id", indexCtrl.EmployeeCtrl.querySQL);

export default router;
