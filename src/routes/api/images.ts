import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { promises as promisesFs } from 'fs';
import fs from 'fs';

const images = express.Router();
const original_images_dir = 'original_images';
const resized_images_dir = 'resized_images';

if (!fs.existsSync(resized_images_dir)) {
  console.log('Directory does not exist!');
  fs.mkdir(resized_images_dir, () => {
    console.log('resized_images directory has been created!');
  });
}

const available_images = fs.readdirSync(path.resolve(original_images_dir));

const invalid_query_response = (): string => {
  let msg = "Invalid Query<br>";
  msg += "==========<br><br>Available images (filenames) are:<br><ul>";
  for (const img of available_images) {
    msg += `<li>${img.slice(0, -4)}</li>`;
  }
  msg += "</ul><br>Width and Height must be >= 200";
  return msg;
}


const resize = async (filename: string, width: number, height: number) => {
  try {
    console.log(`filename = ${filename}`);
    console.log(`width = ${width}`);
    console.log(`height = ${height}`);

    const processed_image = await sharp(path.join(original_images_dir, filename)).resize(width, height).toBuffer();
    await promisesFs.writeFile(path.join(resized_images_dir, filename.slice(0, -4) + "_" + width.toString() +  "_" + height.toString() + '.jpg'), processed_image);

  } catch (err) {
    console.log(err);
  }
};

const is_valid_query = (filename: string, width: number, height: number) => {
  if (!available_images.includes(filename)) {
    return false;
  }
  if (width < 200 || height < 200) {
    return false;
  }
  return true;
}

images.get('/', async (req, res) => {
    const query = req.query;

    if (query.filename === undefined || query.width === undefined || query.height === undefined) {
      res.send('Please, specify the query parameters (filename, width, height), for example: ?filename=fjord&width=200&height=300');
      return;
    }

    let filename = (query.filename as unknown) as string + '.jpg';
    let width = parseInt(query.width as string);
    let height = parseInt(query.height as string);

    if (is_valid_query(filename, width, height)) {
      const full_file_name = path.join(resized_images_dir, filename.slice(0, -4) + "_" + width.toString() +  "_" + height.toString() + '.jpg');
      if (!fs.existsSync(full_file_name)) {
        await resize(filename, width, height);
        console.log('resized successfully!');
      } else {
        console.log('cached image has been sent');
      }
      res.sendFile(path.resolve(full_file_name));
    } else {
      res.send(invalid_query_response());
    }
});

export default images;
