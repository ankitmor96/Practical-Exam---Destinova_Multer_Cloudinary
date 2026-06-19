import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "destinova",
        transformation: [
            {
                height: 500,
                width: 500,
                crop: "limit",
            },
            {
                fetch_format: "webp"
            },
            {
                quality: "auto"
            },

        ],

    },
});
//  make file filter and define mimetype 
const fileFilter = (req, file, cb) => {

    console.log("Mimetype:", file.mimetype);

    const ImagesType = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    if (ImagesType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("only jpg, jpeg, png is allowed"));
    }
}

const uploads = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});

export default uploads;