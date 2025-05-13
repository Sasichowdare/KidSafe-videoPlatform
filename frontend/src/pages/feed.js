import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Feed.module.css'; // Adjust the path to your CSS file

const Feed = () => {
  const navigate = useNavigate();
  const dummyVideos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.w3schools.com/html/movie.mp4',
  ];

  return (
    <div className={styles.container}>
      {dummyVideos.map((src, index) => (
        <Reel key={index} src={src} />
      ))}
      
      <nav className={styles.bottomNav}>
        <button className={styles.navButton} onClick={() => navigate('/home')}>
          <span>🏠</span>
          <span className={styles.navLabel}>Home</span>
        </button>
        <button className={styles.navButton} onClick={() => alert('Upload')}>
          <span>➕</span>
          <span className={styles.navLabel}>Upload</span>
        </button>
        <button className={styles.navButton} onClick={() => navigate('/profile')}>
          <span>👤</span>
          <span className={styles.navLabel}>Profile</span>
        </button>
      </nav>
    </div>
  );
};

const Reel = ({ src }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.reelVideo}
        src={src}
        loop
        muted={muted}
        autoPlay
        playsInline
        onClick={togglePlayPause}
      />
      
      <div className={styles.overlay}>
        <div className={styles.leftOverlay}>
          <div className={styles.profileInfo}>
            <h3 className={styles.username}>@biker.babe</h3>
            <p className={styles.caption}>Hahaha not really dudel!... more 🔥</p>
            <div className={styles.musicInfo}>
              <span>🎵</span>
              <span>LOOKS PRETTY ON YOU - Nessa Barrett</span>
            </div>
          </div>
          <div className={styles.stats}>
            <p>18.7K likes · 850 comments</p>
            <p>Posted on 7/1</p>
          </div>
        </div>
        
        <div className={styles.rightOverlay}>
          <button 
            className={styles.iconButton}
            onClick={handleLike}
            style={{ color: liked ? '#ff3040' : 'white' }}
          >
            ❤️
          </button>
          <button className={styles.iconButton}>💬</button>
          <button className={styles.iconButton}>🔗</button>
          <button 
            className={styles.iconButton}
            onClick={toggleMute}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;