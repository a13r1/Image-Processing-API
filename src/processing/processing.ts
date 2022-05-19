import path from 'path';
import sharp from 'sharp';
import { promises as promisesFs } from 'fs';
import { original_images_dir, resized_images_dir } from '../routes/api/images';

/**
 * resizes a specified image to a given dimensions
 * @param filename a string represents the image name on disk
 * @param width image width after resizing
 * @param height image height after resizing
 * @returns true if image resized successfully, false otherwise
 */
const resize = async (
    filename: string,
    width: number,
    height: number
): Promise<boolean> => {
    try {
        const processed_image: Buffer = await sharp(
            path.join(original_images_dir, filename)
        )
            .resize(width, height)
            .toBuffer();
        await promisesFs.writeFile(
            path.join(
                resized_images_dir,
                filename.slice(0, -4) +
                    '_' +
                    width.toString() +
                    '_' +
                    height.toString() +
                    '.jpg'
            ),
            processed_image
        );
    } catch (err: unknown) {
        return false;
    }
    return true;
};

export default resize;
