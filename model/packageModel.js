import mongoose from "mongoose";


const PackageSchema = new mongoose.Schema({

    PackageName: {
        type: String,
        required: true,
        trim: true
    },
    PackagePrice: {
        type: Number,
        required: true,
        min: 0
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Destination: {
        type: String,
        required: true
    },
    PackageImages: [
        {
            url: {
                type: String,
                required: true
            },
            cloudinary_id: {
                type: String,
                required: true
            }
        }
    ],
    PackageType:{
        type:String,
        required:true
    },
},
    {
        timestamps: true,
    }

);

const Packages = mongoose.model("Packages", PackageSchema);

export default Packages;