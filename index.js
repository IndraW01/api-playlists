const express = require('express');
const bodyParser = require('body-parser');
import { playlist } from './playlist';

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Add a new song to the playlist and update playCount
app.post('/songs', (req, res) => {
  try {
    const { songName, artist } = req.body;

    const newSong = {
      id: Date.now().toString(), // Simple ID generation (for demo purposes)
      songName,
      artist,
      playCount: 0,
    };

    playlist.push(newSong);
    res.status(201).json({ message: 'Song added to the playlist successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Increase playCount of a song
app.post('/songs/:id/play', (req, res) => {
  try {
    const songId = req.params.id;
    const song = playlist.find((item) => item.id === songId);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
    } else {
      song.playCount++;
      res.status(200).json({ message: 'Song play count updated successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get list of songs sorted by most played
app.get('/songs/most-played', (req, res) => {
  try {
    const sortedSongs = [...playlist].sort((a, b) => b.playCount - a.playCount);
    res.status(200).json(sortedSongs);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server ON`);
});
