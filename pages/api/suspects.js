import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'suspects.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const suspects = JSON.parse(data);
    res.status(200).json(suspects);
  } catch (err) {
    console.error("Failed to read suspects.json:", err);
    res.status(500).json({ error: "Unable to load suspect data" });
  }
}
