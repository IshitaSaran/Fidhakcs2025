const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');
const { scoreResumeMatch } = require('../utils/matchSkills');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('resume'), async (req, res) => {
  const file = req.file;
  const keywords = req.body.keywords?.split(',').map(k => k.trim().toLowerCase()) || [];

  if (!file || keywords.length === 0) {
    return res.status(400).json({ error: 'Resume and keywords required' });
  }

  const fileData = fs.readFileSync(file.path);
  const pdfText = await pdfParse(fileData);

  const scoreResult = scoreResumeMatch(pdfText.text, keywords);

  // Optional: delete file after reading
  fs.unlinkSync(file.path);

  res.json(scoreResult);
});

module.exports = router;


