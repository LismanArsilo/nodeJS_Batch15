import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.JobCtrl.findAll);
router.get("/:id", indexCtrl.JobCtrl.findOne);
router.post("/", indexCtrl.JobCtrl.create);
// next untuk menambahkan 2 table yang berelasi
router.post(
  "/next/",
  indexCtrl.JobCtrl.createNext,
  indexCtrl.EmployeeCtrl.create
);

router.put("/:id", indexCtrl.JobCtrl.update);
router.delete("/:id", indexCtrl.JobCtrl.deleted);
router.get("/sql/:id", indexCtrl.JobCtrl.querySQL);

export default router;
