const express = require('express');
const fs = require('fs').promises;
const jsonServer = require('json-server');
const path = require('path');
const sharp = require('sharp');

const server = jsonServer.create();
const router = jsonServer.router('json-server/db.json');
const middlewares = jsonServer.defaults();

server.use('/static', express.static(path.join(__dirname, 'public')));
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/post-image/:postId', async (req, res) => {
  const photoName = `photo-${req.params.postId}.png`;
  const photoPath = `json-server/public/photos/${photoName}`;

  const thumbnailName = `thumbnail-${req.params.postId}.png`;
  const thumbnailPath = `json-server/public/thumbnails/${thumbnailName}`;

  await fs.writeFile(photoPath, Buffer.from(req.body));

  const thumbnail = await sharp(photoPath).resize(150, 150);
  await thumbnail.toFile(thumbnailPath);

  const url = `${req.protocol}://${req.get('host')}`;

  res.send({
    url: `${url}/static/photos/${photoName}`,
    thumbnailUrl: `${url}/static/thumbnails/${thumbnailName}`,
  });
});

server.use(router);

server.listen(3000, () => {
  console.log('\nJSON Server is running at http://localhost:3000/\n');
  console.log('Resources:');

  for (const [resource, data] of Object.entries(router.db.__wrapped__)) {
    console.log(`/${resource} - ${data.length}`);
  }
});
