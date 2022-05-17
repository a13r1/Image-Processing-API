import express from 'express';
import sharp from 'sharp';
import {promises as fs} from 'fs';

const images = express.Router();

const process = async (file_name: string, width: number, height: number) => {
  try {
    console.log(`file_name = ${file_name}`);
    console.log(`width = ${width}`);
    console.log(`height = ${height}`);
    console.log(typeof width);

    const processed_image = await sharp("original_images/" + file_name + ".jpg").resize(width, height).toBuffer();
    console.log('resized successfully');
    await fs.writeFile("resized_images/" + file_name + ".jpg", processed_image);

  } catch (err) {
    console.log(err);
  }
};

images.get('/', (req, res) => {
    //res.send('images route');
    const query = req.query;
    let file_name: string = "";
    let width: number = 0;
    let height: number = 0;
    if (query.file_name !== undefined) {
        file_name = (query.file_name as unknown) as string;
    }
    if (query.width !== undefined) {
        width = parseInt(query.width as string);
    }
    if (query.height !== undefined) {
        height = parseInt(query.height as string);
    }
    process(file_name, width, height);
    
    const src = `http://localhost:3000${req.originalUrl}`;
    console.log(src);
    console.log(req.query);
    const html = `<img src="http://localhost:3000/resized_images/fjord.jpg">`;
    console.log(__dirname);
    res.sendFile("resized_images/fjord.jpg", { root: __dirname + "/../../../" });
});

export default images;