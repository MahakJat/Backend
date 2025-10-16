import React, { useState } from "react";

const MoodSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      //double click
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>
      {songs.map((song, index) => {
        console.log(song.audio);
        return (
          <div key={index}>
            <div className="title">
              <h3 className="song-title">{song.title}</h3>
              <p className="artist">{song.artist}</p>
              <div style={{ backgroundColor: "red" }}>
                {isPlaying === index && (
                  <audio
                    src={song.audio}
                    autoPlay={index === isPlaying}
                    style={{
                      width: "400px",
                      height: "40px",
                      display: "none",
                    }}
                  ></audio>
                )}
                <button onClick={() => handlePlayPause(index)}>
                  {isPlaying === index ? "pause" : "play"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoodSongs;
