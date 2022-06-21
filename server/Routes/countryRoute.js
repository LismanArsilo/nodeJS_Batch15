import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router();

router.get("/", indexCtrl.CountryCtrl.findAll);
router.get("/:id", indexCtrl.CountryCtrl.findOne);
router.post("/", indexCtrl.CountryCtrl.create);
// next untuk menambahkan 2 table yang berelasi yaitu locations
router.post(
  "/next/",
  indexCtrl.CountryCtrl.createNext,
  indexCtrl.LocationCtrl.create
);
router.put("/:id", indexCtrl.CountryCtrl.update);
router.delete("/:id", indexCtrl.CountryCtrl.deleted);
router.put("/sql/:id", indexCtrl.CountryCtrl.querySQL);

export default router;
