import React, { useState, useEffect } from "react";
import BadgeDisplay from "./BadgeDisplay";
import "./Rewards.css";

// Sample badge definitions for demo. In a real app these could be unlocked dynamically.
const DEFAULT_BADGES = [
  {
    id: "badge-firstgoal",
    label: "First Goal!",
    icon: "🥇",
    description: "Created your very first savings goal.",
    earnedAt: null, // set date when awarded
  },
  {
    id: "badge-savings100",
    label: "Super Saver",
    icon: "💰",
    description: "Saved $100 in total.",
    earnedAt: null,
  },
  {
    id: "badge-quizstar",
    label: "Quiz Star",
    icon: "🌟",
    description: "Scored a perfect round on the quiz.",
    earnedAt: null,
  },
];

// Local Storage helpers
const STORAGE_KEY = "piggy_smart_rewards_v1";
function getStoredBadges() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_BADGES;
  } catch (e) {
    return DEFAULT_BADGES;
  }
}
function storeBadges(badges) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
}

/**
 * PUBLIC_INTERFACE
 * Rewards component: Shows earned rewards/badges, allows remove/delete for demo
 */
function Rewards() {
  const [badges, setBadges] = useState([]);

  // Load from storage on mount
  useEffect(() => {
    setBadges(getStoredBadges());
  }, []);

  // Sync to storage when badges change
  useEffect(() => {
    storeBadges(badges);
  }, [badges]);

  // Removes a badge by id
  // PUBLIC_INTERFACE
  function handleDeleteBadge(id) {
    if (window.confirm("Delete this badge from your collection?")) {
      setBadges(badges.filter((b) => b.id !== id));
    }
  }

  // Demo: mark a badge earned (sets the date)
  function handleMarkEarned(id) {
    setBadges(
      badges.map((b) =>
        b.id === id && !b.earnedAt
          ? { ...b, earnedAt: new Date().toISOString() }
          : b
      )
    );
  }

  // Demo: reset all badges
  function handleResetBadges() {
    if (window.confirm("Reset all badges?")) {
      setBadges(DEFAULT_BADGES);
    }
  }

  return (
    <div className="ps-badges__container" style={{ maxWidth: 440, margin: "0 auto", padding: 20 }}>
      <h2 style={{ color: "#4FC3F7", marginBottom: 18 }}>
        <span role="img" aria-label="Rewards">🏅</span> Your Rewards & Badges
      </h2>
      <BadgeDisplay badges={badges.filter(b => b.earnedAt)} big={true} />
      <div style={{ margin: "19px 0 2px 0", color: "#FFD54F" }}>
        Missing a badge? Mark badges below as earned for testing, or delete any badge.<br/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
        {badges.map(badge => (
          <div key={badge.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "#23232b", borderRadius: 10, padding: "8px 10px" }}>
            <span style={{ fontSize: 28 }}>{badge.icon}</span>
            <div style={{ flex: 1 }}>
              <b style={{ color: "#FF8A65" }}>{badge.label}</b>
              <div style={{ fontSize: 14, color: "#81C784" }}>{badge.description}</div>
              {badge.earnedAt && (
                <span style={{ fontSize: 12, color: "#FFD54F" }}>
                  Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {!badge.earnedAt && (
              <button className="btn" style={{background:"#81C784"}} onClick={() => handleMarkEarned(badge.id)}>
                Mark Earned
              </button>
            )}
            <button
              className="btn"
              style={{ background: "#E87A41", marginLeft: 5 }}
              onClick={() => handleDeleteBadge(badge.id)}
              aria-label="delete badge"
            >
              🗑️
            </button>
          </div>
        ))}
        <button className="btn" style={{background:"#777"}} onClick={handleResetBadges}>
          Reset Badges
        </button>
      </div>
    </div>
  );
}

export default Rewards;
