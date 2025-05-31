import React, { useEffect } from "react";
import "./Rewards.css";

/**
 * PUBLIC_INTERFACE
 * CelebratoryAnimation - Shows animated confetti, sounds, etc. when achievements occur.
 * Props:
 *   show: boolean - when true, plays confetti+sound and disappears after duration (or keep showing)
 *   sound?: "chime" | "success" | "badge" | string (custom URI)
 *   onFinish?: function() - called when animation completes (optional)
 *   style?: custom inline styling for animation box
 *
 * Use by toggling `show` true on achievement, then set to false after short time.
 * Can be reused by Quiz, SavingGoals, Rewards itself.
 */
const CONFETTI_EMOJI = ["🎉", "🏅", "👏", "🎊", "💸", "🌟"];

const SOUNDS = {
  chime:
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAABCAAABAgAAAEAAgQQAACAQAAECAAAQAAABAIBAAAEIAAAgEAAABCAAAQIAAABAgAA==",
  success:
    "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWAQAAABAgAABAAAAMEAAAgAABAgAAEAAgBAAABAgAABAAAIEAAAEAgAABAIQA==",
  badge:
    "data:audio/wav;base64,UklGRnQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZAAAABAgAAEAQAABAAAECAAAQAAAEAABAgAABAAABCAAAQIAAABAgAABAgAA=="
};

function playSound(uri) {
  try {
    const audio = new window.Audio(uri);
    audio.volume = 0.5;
    audio.play();
  } catch {}
}

function CelebratoryAnimation({ show, sound = "chime", onFinish, style = {} }) {
  useEffect(() => {
    if (!show) return;
    // Sound
    const soundUri = SOUNDS[sound] || sound;
    playSound(soundUri);

    // Hide after 1.6s if supplied
    if (onFinish && show) {
      const t = setTimeout(() => onFinish(), 1600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line
  }, [show, sound]);
  if (!show) return null;
  return (
    <div className="ps-celebration" style={style} aria-live="polite">
      {Array(18)
        .fill(0)
        .map((_, i) => (
          <span
            className="ps-confetti-emoji"
            style={{
              left: `${5 + Math.random() * 89}%`,
              animationDuration: `${1 + Math.random() * 1.1}s`,
              fontSize: `${1.2 + Math.random() * 1.4}em`
            }}
            key={i}
          >
            {CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)]}
          </span>
        ))}
    </div>
  );
}

export default CelebratoryAnimation;
