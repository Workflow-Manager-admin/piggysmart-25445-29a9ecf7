import React from "react";
import "./Rewards.css";

/**
 * PUBLIC_INTERFACE
 * BadgeDisplay - Shows a collection/list of earned badges for the user.
 * Props:
 *   badges: array of { id, label, icon, description, earnedAt (date string, optional) }
 *   big?: boolean - if true, renders badges larger (e.g. for popover/award)
 * 
 * Badges should be provided from parent based on app state
 * (see Rewards.js for badge definitions and use).
 *
 * Styling: PiggySmart playful colors, with flair for "earned" badges (animation, overlay, etc).
 */
function BadgeDisplay({ badges = [], big = false }) {
  return (
    <div className={`ps-badges${big ? " ps-badges--big" : ""}`}>
      {badges.length === 0 && (
        <div className="ps-badges__none">No badges earned yet.</div>
      )}
      {badges.map((badge) => (
        <div className="ps-badge" key={badge.id}>
          <span className="ps-badge__icon" title={badge.label} aria-label={badge.label}>
            {badge.icon}
          </span>
          {big && (
            <div className="ps-badge__label">
              <b>{badge.label}</b>
              <p className="ps-badge__desc">{badge.description}</p>
              {badge.earnedAt && (
                <span className="ps-badge__date">
                  {new Date(badge.earnedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BadgeDisplay;
