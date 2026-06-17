import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"

export default new (class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure:true
        });
    }

    async destination(image: string): Promise<any> {
        try {
            return await cloudinary.uploader.upload(`src/upload/${image}`);
        } catch (error) {
            throw error;
        }
    }

    async delete(image: string) {
        try {
            const imageArray = image.split("/")
            let imageName = imageArray[imageArray.length - 1]
            imageName = imageName.slice(0, -4)

            const deleted = await cloudinary.uploader.destroy(imageName)
            console.log("image cloudinary deleted: " + deleted)

        } catch (error) {
            throw error
        }
    }
})();
