import React from "react";
import "./Rewards.css";

/**
 * PUBLIC_INTERFACE
 * PiggyMascot - Shows the evolving piggy mascot.
 * Props:
 *   stage: "baby"|"growing"|"super"|"legend" or numeric stage (0-3)
 *   animate?: boolean (for celebratory effect)
 *   percentProgress: 0-100 (for smooth transitions)
 *
 * Evolution stages (milestones):
 *   - "baby": 0%   (just started)
 *   - "growing": >0% - 49% progress
 *   - "super": 50% - 99% progress
 *   - "legend": 100%+ (all goals/major milestone)
 *
 * Style: Playful, vibrant SVG; dramatize color/expressions based on progress.
 */
function PiggyMascot({ stage, animate = false, percentProgress = 0 }) {
  let mascotStage = typeof stage === "number" 
    ? ["baby", "growing", "super", "legend"][Math.max(0, Math.min(3, stage))] 
    : stage;

  // Pick SVG for stage (could be replaced with richer artwork/assets)
  const piggySVG = {
    baby: (
      // Baby (small, happy)
      <svg className={`ps-mascot-svg${animate ? " ps-mascot--animate" : ""} ps-mascot-baby`} width="130" height="90" viewBox="0 0 130 90" aria-label="Baby Piggy" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="65" cy="55" rx="42" ry="27" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        <ellipse cx="28" cy="38" rx="8" ry="4.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="1.6"/>
        <ellipse cx="116" cy="63" rx="8.5" ry="7" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        <ellipse cx="120" cy="63" rx="1.6" ry="1.2" fill="#FF8A65"/>
        <ellipse cx="111" cy="63" rx="1.6" ry="1.2" fill="#FF8A65"/>
        <ellipse cx="82" cy="52" rx="3.5" ry="3.7" fill="#fff"/>
        <ellipse cx="82" cy="54" rx="1.3" ry="1.7" fill="#231F20"/>
        <rect x="59" y="44" width="12" height="3" rx="1.3" fill="#23232b"/>
        <path d="M95 68 Q83 78 69 70" stroke="#FF8A65" strokeWidth="1.6" fill="none"/>
        <rect x="42" y="80" width="4.5" height="7" rx="1.8" fill="#FFD54F" stroke="#FF8A65" strokeWidth="1.1"/>
        <rect x="83" y="80" width="4.5" height="7" rx="1.8" fill="#FFD54F" stroke="#FF8A65" strokeWidth="1.1"/>
      </svg>
    ),
    growing: (
      // Growing (bigger, determined face)
      <svg className={`ps-mascot-svg${animate ? " ps-mascot--animate" : ""} ps-mascot-growing`} width="160" height="110" viewBox="0 0 160 110" aria-label="Growing Piggy" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="65" rx="55" ry="35" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.5"/>
        <ellipse cx="34" cy="39" rx="13.5" ry="6.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        <ellipse cx="137" cy="77" rx="10.5" ry="7" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        <ellipse cx="141" cy="77" rx="2.1" ry="1.7" fill="#FF8A65"/>
        <ellipse cx="132" cy="77" rx="2.1" ry="1.7" fill="#FF8A65"/>
        <ellipse cx="102" cy="59" rx="4.5" ry="5" fill="#fff"/>
        <ellipse cx="102" cy="61" rx="2.2" ry="2.7" fill="#231F20"/>
        <rect x="66" y="47" width="20" height="5" rx="2" fill="#23232b"/>
        <path d="M120 90 Q105 106 82 97" stroke="#FF8A65" strokeWidth="2.2" fill="none"/>
        <rect x="50" y="99" width="6" height="9" rx="2.4" fill="#FFD54F" stroke="#FF8A65" strokeWidth="1.8"/>
        <rect x="105" y="99" width="6" height="9" rx="2.4" fill="#FFD54F" stroke="#FF8A65" strokeWidth="1.8"/>
      </svg>
    ),
    super: (
      // Super (sparkle, sunglasses)
      <svg className={`ps-mascot-svg${animate ? " ps-mascot--animate" : ""} ps-mascot-super`} width="170" height="120" viewBox="0 0 170 120" aria-label="Super Piggy" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="85" cy="70" rx="65" ry="41" fill="#FFD54F" stroke="#FF8A65" strokeWidth="3"/>
        <ellipse cx="41" cy="37" rx="14.5" ry="9" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.2"/>
        <ellipse cx="150" cy="85" rx="14" ry="8" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.5"/>
        <ellipse cx="156" cy="85" rx="2.7" ry="2.1" fill="#FF8A65"/>
        <ellipse cx="144" cy="85" rx="2.7" ry="2.1" fill="#FF8A65"/>
        {/* Sunglasses */}
        <rect x="96" y="63" width="19" height="7" rx="2" fill="#23232b"/>
        <rect x="88" y="61" width="8" height="8" rx="2" fill="#23232b"/>
        <rect x="118" y="63" width="8" height="7" rx="2" fill="#23232b"/>
        {/* Smile */}
        <path d="M126 106 Q104 117 87 104" stroke="#FF8A65" strokeWidth="2.7" fill="none"/>
        <rect x="61" y="110" width="7" height="10" rx="3" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        <rect x="114" y="110" width="7" height="10" rx="3" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
        {/* Sparkle */}
        <text x="40" y="30" fontSize="24" aria-hidden="true">✨</text>
        <text x="125" y="48" fontSize="18" aria-hidden="true">🌟</text>
      </svg>
    ),
    legend: (
      // Legendary (crown, blitz)
      <svg className={`ps-mascot-svg${animate ? " ps-mascot--animate" : ""} ps-mascot-legend`} width="190" height="135" viewBox="0 0 190 135" aria-label="Legend Piggy" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Crown */}
        <polygon points="95,7 103,28 111,7 120,28 129,7 137,28 133,45 97,45" fill="#FFD700" stroke="#FF8A65" strokeWidth="2"/>
        {/* Main Body */}
        <ellipse cx="100" cy="85" rx="78" ry="46" fill="#FFD54F" stroke="#FF8A65" strokeWidth="3.3"/>
        <ellipse cx="47" cy="53" rx="18" ry="9.9" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.2"/>
        <ellipse cx="163" cy="103" rx="16.5" ry="10.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.7"/>
        <ellipse cx="171" cy="103" rx="3.3" ry="2.2" fill="#FF8A65"/>
        <ellipse cx="155" cy="103" rx="3.3" ry="2.2" fill="#FF8A65"/>
        <ellipse cx="128" cy="83" rx="5.5" ry="6.2" fill="#fff"/>
        <ellipse cx="128" cy="86" rx="2.6" ry="2.9" fill="#231F20"/>
        {/* Slot */}
        <rect x="90" y="65" width="24" height="7" rx="3" fill="#23232b"/>
        {/* Smile */}
        <path d="M158 120 Q136 132 100 118" stroke="#FF8A65" strokeWidth="3.2" fill="none"/>
        {/* Crownshine */}
        <text x="85" y="15" fontSize="22" aria-hidden="true">👑</text>
        {/* Feet */}
        <rect x="75" y="124" width="9" height="11" rx="3.2" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.2"/>
        <rect x="120" y="124" width="9" height="11" rx="3.2" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2.2"/>
        {/* Confetti pop if animate */}
        {animate && (
          <text x="100" y="45" fontSize="33" aria-hidden="true" style={{ opacity: 0.85 }}>🎊</text>
        )}
      </svg>
    ),
  }[mascotStage] || null;

  return (
    <div className={`ps-mascot ps-mascot-stage-${mascotStage}`}>
      {piggySVG}
      <div className="ps-mascot__subtitle">
        {mascotStage === "baby" && "Baby Piggy"}
        {mascotStage === "growing" && "Growing Piggy"}
        {mascotStage === "super" && "Super Piggy"}
        {mascotStage === "legend" && "Legendary Piggy!"}
      </div>
    </div>
  );
}

export default PiggyMascot;
