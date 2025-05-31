import React, { useState, useEffect } from "react";
import "./SavingsGoals.css";

// Sample playful icon choices for goals
const ICON_OPTIONS = [
  "🎒", // School
  "⚽", // Sports
  "🎮", // Gaming
  "📚", // Books
  "🛴", // Scooter
  "🧩", // Puzzle
  "🎁", // Gift
  "💻", // Electronics
  "🐷", // Piggy
];

/**
 * Util - Local Storage helpers for persistent state
 */
const STORAGE_KEY = "piggy_smart_savings_goals_v1";
const getStoredGoals = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const storeGoals = (goals) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
};

/**
 * SavingsGoals main page/component
 * Lets users Create/Read/Update/Delete savings goals, make deposits,
 * and see playful goal visuals/progress and persistent state.
 */
// PUBLIC_INTERFACE
function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null); // goal.id if editing
  const [form, setForm] = useState(initForm());

  // Load & sync with localStorage
  useEffect(() => {
    setGoals(getStoredGoals());
  }, []);

  useEffect(() => {
    storeGoals(goals);
  }, [goals]);

  // Reset form to initial
  function resetForm() {
    setForm(initForm());
    setEditGoalId(null);
    setShowAdd(false);
  }

  function initForm() {
    return {
      name: "",
      target: "",
      deadline: "",
      icon: ICON_OPTIONS[0],
    };
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddClick() {
    setForm(initForm());
    setShowAdd(true);
    setEditGoalId(null);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName || Number(form.target) <= 0) return;
    // Add or update
    if (editGoalId) {
      setGoals(goals.map((g) =>
        g.id === editGoalId ? { ...g, ...form, target: Number(form.target) } : g
      ));
    } else {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(), // simple unique id
          name: trimmedName,
          target: Number(form.target),
          deadline: form.deadline,
          icon: form.icon,
          saved: 0,
          deposits: [],
        },
      ]);
    }
    resetForm();
  }

  function handleEdit(goal) {
    setForm({
      name: goal.name,
      target: goal.target,
      deadline: goal.deadline,
      icon: goal.icon,
    });
    setEditGoalId(goal.id);
    setShowAdd(true);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this goal? All saved money for it will be removed.")) {
      setGoals(goals.filter((g) => g.id !== id));
    }
    resetForm();
  }

  // Deposit to specific goal
  function handleDeposit(goalId, amount) {
    setGoals(goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            saved: Math.min(g.saved + amount, g.target),
            deposits: [
              ...(g.deposits || []),
              {
                id: Date.now(),
                amount,
                date: new Date().toISOString(),
              },
            ],
          }
        : g
    ));
  }

  return (
    <div className="savings-goals__container">
      <div className="savings-goals__header">
        <h2>
          <span role="img" aria-label="Goals">
            🎯
          </span>{" "}
          Your Savings Goals
        </h2>
        <button className="btn savings-goals__add-btn" onClick={handleAddClick}>
          <span role="img" aria-label="add">➕</span> Add Goal
        </button>
      </div>

      {showAdd && (
        <form className="savings-goals__form" onSubmit={handleFormSubmit}>
          <div className="savings-goals__form-row">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleInput} required maxLength={20} placeholder="e.g. New Bike" />
            </label>
            <label>
              Target ($)
              <input name="target" value={form.target} onChange={handleInput} required type="number" min={1} />
            </label>
          </div>
          <div className="savings-goals__form-row">
            <label>
              Deadline
              <input name="deadline" value={form.deadline} onChange={handleInput} type="date" />
            </label>
            <label>
              Icon
              <select name="icon" value={form.icon} onChange={handleInput}>
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="savings-goals__form-actions">
            <button className="btn" type="submit">
              {editGoalId ? "Update Goal" : "Add Goal"}
            </button>
            <button className="btn" type="button" onClick={resetForm} style={{ background: "#777", marginLeft: 10 }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="savings-goals__list">
        {goals.length === 0 && (
          <div className="savings-goals__empty">
            <span role="img" aria-label="no goals" style={{ fontSize: 42 }}>😴</span>
            <p>No savings goals yet. Add one to start saving!</p>
          </div>
        )}

        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
          const isComplete = percent === 100;
          return (
            <div className={`savings-goal-card${isComplete ? " achieved" : ""}`} key={goal.id}>
              <div className="savings-goal-card__icon" aria-label={goal.icon}>
                <span style={{ fontSize: 38 }}>{goal.icon}</span>
              </div>
              <div className="savings-goal-card__main">
                <div className="savings-goal-card__title">{goal.name}</div>
                <div className="savings-goal-card__target">
                  Goal: <b>${goal.target}</b> {goal.deadline && <span className="savings-goal-card__deadline">• <span role="img" aria-label="calendar">📅</span> {goal.deadline}</span>}
                  {isComplete && <span className="savings-goal-card__celebrate" role="img" aria-label="confetti"> 🎉</span>}
                </div>
                <div className="savings-goal-card__progress-bar">
                  <div
                    className="savings-goal-card__progress-fill"
                    style={{
                      width: percent + "%",
                      background: isComplete
                        ? "linear-gradient(90deg, #81C784 40%, #FFD54F 100%)"
                        : "linear-gradient(90deg, #FFD54F 70%, #FF8A65 100%)"
                    }}
                  ></div>
                </div>
                <div className="savings-goal-card__amount-section">
                  <span className="savings-goal-card__saved">${goal.saved}</span>
                  <span className="savings-goal-card__slash">/</span>
                  <span className="savings-goal-card__goal">${goal.target}</span>
                </div>
                <div className="savings-goal-card__actions">
                  <button className="btn" onClick={() => handleEdit(goal)}>
                    <span role="img" aria-label="edit">✏️</span>
                  </button>
                  <button className="btn" onClick={() => handleDelete(goal.id)} style={{ background: "#E87A41" }}>
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </div>
                <GoalDepositSection
                  goal={goal}
                  onDeposit={handleDeposit}
                  isComplete={isComplete}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Deposit section: allows user to add playful animated deposit to a goal.
 */
function GoalDepositSection({ goal, onDeposit, isComplete }) {
  const [showAnim, setShowAnim] = useState(false);
  const [deposit, setDeposit] = useState("");

  const canDeposit = !isComplete && Number(deposit) > 0 && goal.saved < goal.target;

  const handleDepositClick = () => {
    if (!canDeposit) return;
    setShowAnim(true);
    setTimeout(() => {
      onDeposit(goal.id, Math.min(Number(deposit), goal.target - goal.saved));
      setShowAnim(false);
      setDeposit("");
    }, 550);
  };

  return (
    <div className="goal-deposit-zone">
      <label>
        <span role="img" aria-label="deposit">💰</span> Deposit
        <input
          type="number"
          min={1}
          max={goal.target - goal.saved}
          value={deposit}
          onChange={e => setDeposit(e.target.value)}
          disabled={isComplete}
          className="goal-deposit-input"
        />
      </label>
      <button
        className="btn goal-deposit-btn"
        style={{ marginLeft: 7, background: "#4FC3F7", color: "#19273a" }}
        disabled={!canDeposit}
        onClick={handleDepositClick}
      >
        <span role="img" aria-label="coin">🪙</span> Add
      </button>
      {showAnim && (
        <span className="goal-coin-drop-anim" role="img" aria-label="falling coin">🪙</span>
      )}
      <ul className="goal-deposit-history">
        {goal.deposits && goal.deposits.length > 0 && (
          goal.deposits
            .slice().reverse()
            .map(dep => (
              <li key={dep.id}>
                +${dep.amount} <span role="img" aria-label="clock">⏰</span>{" "}
                <span className="dep-date">{new Date(dep.date).toLocaleDateString()}</span>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default SavingsGoals;
