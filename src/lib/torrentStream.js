// Including modules
import WebTorrent from 'webtorrent';

// Initializing WebTorrent
const client = new WebTorrent();

// Exporting the function
export function stream(magnet,video) {
  // Using a magnet link
  let NewMagnetTorrentId = magnet;
  client.add(NewMagnetTorrentId, function (torrent) {
    // Using the .mp4 file
    const file = torrent.files.find(function (Newfile) {
      // Returning filename ending with .mp4
      return Newfile.name.endsWith('.mp4');
    });
file.renderTo(video)
    // Create a video element
  

    // Append the video element to the DOM

    // Start streaming
   
  });
}
