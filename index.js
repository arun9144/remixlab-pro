// Simple Express server with upload endpoint (for demo). In production, run workers and use S3.
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 3001;

app.post('/api/upload', upload.single('file'), (req,res)=>{
  if(!req.file) return res.status(400).json({ error: 'no file' });
  // In production: enqueue job to perform stem separation or transcoding.
  res.json({ message: 'file received', filename: req.file.filename, original: req.file.originalname });
});

app.get('/', (req,res)=> res.json({ ok: true }));

app.listen(PORT, ()=> console.log('Server listening on', PORT));
