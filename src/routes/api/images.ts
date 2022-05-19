import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { promises as promisesFs } from 'fs';
import fs from 'fs';

const images = express.Router();
const original_images_dir = 'original_images';
const resized_images_dir = 'resized_images';

// min and max values for width and height
const min_val = 25;
const max_val = 16000;

const response_style =
    'color: #404040; background: #fdfad8; font-family: consolas; font-size: 20px; padding: 24px;';

// checks if the resized_images directory exists or not, if not, then create it
if (!fs.existsSync(resized_images_dir)) {
    console.log('directory does not exist!');
    fs.mkdir(resized_images_dir, () => {
        console.log('resized_images directory has been created!');
    });
}

// get all avaliable images from original_images directory
const available_images = fs.readdirSync(path.resolve(original_images_dir));

/**
 * creates a reponse message in case the user entered invalid query string
 * @returns msg: string
 */
const invalid_query_response = (): string => {
    let msg = `<div style="${response_style}">Invalid Query<br>`;
    msg += '=============<br><br>Available images (filenames) are:<br><ul>';
    for (const img of available_images) {
        msg += `<li>${img.slice(0, -4)}</li>`;
    }
    msg += `</ul><br>Constraints: ${min_val} <= width, height <= ${max_val}</div>`;
    return msg;
};

/**
 * resizes a specified image to a given dimensions
 * @param filename a string represents the image name on disk
 * @param width image width after resizing
 * @param height image height after resizing
 * @returns true if image resized successfully, false otherwise
 */
const resize = async (filename: string, width: number, height: number) => {
    try {
        const processed_image = await sharp(
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
    } catch (err) {
        return false;
    }
    return true;
};

/**
 * checks if the query is valid
 * @param filename a string represents the image name on disk
 * @param width image width after resizing
 * @param height image height after resizing
 * @returns true if all requirements are met, false otherwise
 */
const is_valid_query = (filename: string, width: number, height: number) => {
    if (!available_images.includes(filename)) {
        return false;
    }
    if (
        width < min_val ||
        width > max_val ||
        height < min_val ||
        height > max_val
    ) {
        return false;
    }
    return true;
};

images.get('/', async (req, res) => {
    const query = req.query;
    // if the user ignored a required query parameter, send an appropriate response
    if (
        query.filename === undefined ||
        query.width === undefined ||
        query.height === undefined
    ) {
        res.send(
            `<p style="${response_style}">Please, specify the query parameters (filename, width, height), for example: ?filename=fjord&width=200&height=300</p>`
        );
        return;
    }

    const filename = (query.filename as unknown as string) + '.jpg';
    const width = parseInt(query.width as string);
    const height = parseInt(query.height as string);

    if (is_valid_query(filename, width, height)) {
        const full_file_name = path.join(
            resized_images_dir,
            filename.slice(0, -4) +
                '_' +
                width.toString() +
                '_' +
                height.toString() +
                '.jpg'
        );
        // if file already exists (cached), don't reprocess the image
        if (!fs.existsSync(full_file_name)) {
            await resize(filename, width, height);
            console.log('resized successfully!');
        } else {
            console.log('cached image has been sent!');
        }
        res.sendFile(path.resolve(full_file_name));  // use path.resolve as sendFile requires an absolute path
    } else {
        res.send(invalid_query_response());
    }
});

export { images, available_images, is_valid_query, resize };
