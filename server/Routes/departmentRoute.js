import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.DepartmentCtrl.findAll);
router.get("/:id", indexCtrl.DepartmentCtrl.findOne);
router.post("/", indexCtrl.DepartmentCtrl.create);
// next untuk menambahkan 2 table yang berelasi yaitu employee
router.post(
  "/next/",
  indexCtrl.DepartmentCtrl.createNext,
  indexCtrl.EmployeeCtrl.create
);

router.put("/:id", indexCtrl.DepartmentCtrl.update);
router.delete("/:id", indexCtrl.DepartmentCtrl.deleted);
router.get("/sql/:id", indexCtrl.DepartmentCtrl.querySQL);

export default router;
