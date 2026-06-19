import Packages from "../model/packageModel.js";
import HttpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const { PackageName, PackagePrice, StartDate, EndDate, Duration, Destination, PackageType } = req.body;

    console.log(req.body);

    if (!PackageName || !PackagePrice || !StartDate || !EndDate || !Duration || !Destination || !PackageType) {
      return next(new HttpError("packages data not found", 400));
    }

    console.log(req.files);

    if (!req.files || req.files.length === 0) {
      return next(new HttpError("packages image not found", 400));
    }

    const PackageImages = req.files.map((file) => ({
      url: file.path,
      cloudinary_id: file.filename
    }));

    const newPackages = new Packages({

      PackageName,
      PackagePrice,
      StartDate,
      EndDate,
      Duration,
      Destination,
      PackageType,
      PackageImages,

    });

    await newPackages.save();

    res.status(201).json({
      success: true,
      message: "new package data add successFully",
      data: newPackages
    });


  } catch (error) {
    console.log(error.message, 500);
  }
};

const getAllPackages = async (req, res, next) => {
  try {

    const packages = await Packages.find({});

    if (packages.length === 0) {
      return next(new HttpError("packages data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "packages data found",
      data: packages
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
};

const getPackagesById = async (req, res, next) => {
  try {

    const { id } = req.params;

    const getById = await Packages.findById(id);

    if (!getById) {
      return next(new HttpError("packages id not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "packages id found",
      data: getById
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
};

const deletePackages = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletePackage = await Packages.findById(id);

    if (!deletePackage) {
      return next(new HttpError("delete package not found", 404));
    }

    for (const image of deletePackage.PackageImages) {
      await cloudinary.uploader.destroy(image.cloudinary_id);
    }

    await deletePackage.deleteOne();

    res.status(200).json({
      success: true,
      message: "delete successFully"
    });
  } catch (error) {
    return next(new HttpError("route not found", 500));
  }
}

const updatePackage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const TravelPackage = await Packages.findById(id);

    if (!TravelPackage) {
      return next(new HttpError("package not found", 404));
    }

    const updates = Object.keys(req.body || {});

    const allowedFields = [
      "PackageName",
      "PackagePrice",
      "StartDate",
      "EndDate",
      "Duration",
      "Destination",
      "PackageType",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      TravelPackage[update] = req.body[update];
    });

    if (req.files && req.files.length > 0) {

      for (const image of TravelPackage.PackageImages) {
        await cloudinary.uploader.destroy(image.cloudinary_id);
      }

      TravelPackage.PackageImages = req.files.map((file) => ({
        url: file.path,
        cloudinary_id: file.filename
      }));
    }

    await TravelPackage.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully",
      data: TravelPackage,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default { add, getAllPackages, getPackagesById, deletePackages, updatePackage };