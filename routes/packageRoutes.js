import express from "express";
import uploads from "../middleware/multer.js";
import packageController from "../controller/packageController.js";

const router = express.Router();


router.post("/add", uploads.array("PackageImages",15),

    packageController.add);

router.get("/getAllPackages", packageController.getAllPackages);

router.get("/getPackagesById/:id", packageController.getPackagesById);

router.delete("/deletePackages/:id", packageController.deletePackages);

router.put("/:id",uploads.array("PackageImages") , packageController.updatePackage);

export default router;