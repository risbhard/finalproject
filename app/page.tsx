"use client";
import { useState } from "react";

const categories = [
	{ label: "🍔 Food & Snacks" },
	{ label: "🎬 What to Watch" },
	{ label: "🎮 Things to Do" },
	{ label: "👕 What to Wear" },
	{ label: "🎵 Music Vibe" },
	{ label: "📚 School Subject to Study" },
	{ label: "🧘‍♀️ Self-Care / Break Ideas" },
	{ label: "📱 Who to Text/Call" },
	{ label: "📍Where to Go" },
	{ label: "🤷 “I’m Bored” Randomizer" },
];

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
	const [options, setOptions] = useState<string[]>(["", ""]);
	const [result, setResult] = useState<string | null>(null);
	const [rolling, setRolling] = useState(false);
	const [strength, setStrength] = useState<number | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [aiThinker, setAiThinker] = useState(false);
	const [confettiMode, setConfettiMode] = useState(false);
	const [tension, setTension] = useState<'low' | 'medium' | 'max'>('medium');
	const [darkMode, setDarkMode] = useState(false);

	// Add option field
	const addOption = () => {
		if (options.length < 8) setOptions([...options, ""]);
	};

	// Remove option field
	const removeOption = (idx: number) => {
		if (options.length > 2) setOptions(options.filter((_, i) => i !== idx));
	};

	// Update option value
	const updateOption = (idx: number, value: string) => {
		setOptions(options.map((opt, i) => (i === idx ? value : opt)));
	};

	// Roll the dice with animation
	const rollDice = () => {
		const validOptions = options.map((opt) => opt.trim()).filter((opt) => opt);
		if (validOptions.length >= 2) {
			setRolling(true);
			setTimeout(() => {
				const random = validOptions[Math.floor(Math.random() * validOptions.length)];
				setResult(random);
				setStrength(Math.floor(Math.random() * 51) + 50); // 50-100%
				setRolling(false);
			}, 1200);
		}
	};

	// Reset everything
	const reset = () => {
		setResult(null);
		setStrength(null);
		setSelectedCategory(null);
		setOptions(["", ""]);
	};

	return (
		<div style={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
			{/* Sticky Pro Navbar */}
			<nav className="navbar-pro">
				<span className="navbar-title-pro">Decision Dice Pro 🎲</span>
				{/* Main menu button */}
				<button
					className="menu-btn-pro"
					aria-label="Menu"
					onClick={() => setMenuOpen((v) => !v)}
				>
					<span style={{ fontSize: "1.7rem" }}>⋮</span>
				</button>
			</nav>
			{/* Slide-down main menu */}
			{menuOpen && (
				<div className="menu-dropdown">
					<div className="menu-item" onClick={() => setMenuOpen(false)}>
						🎲 Roll (Home)
					</div>
					<div className="menu-item">
						👥 Group Mode
					</div>
					<div className="menu-item">
						🎡 Wheel of Chaos
					</div>
					<div className="menu-item menu-toggle" onClick={() => setAiThinker((v) => !v)}>
						🧠 AI Thinker Mode <span>{aiThinker ? "✅" : "⬜️"}</span>
					</div>
					<div className="menu-item menu-toggle" onClick={() => setConfettiMode((v) => !v)}>
						🎉 Confetti Mode <span>{confettiMode ? "✅" : "⬜️"}</span>
					</div>
					<div className="menu-item">
						🎭 Tension Slider
						<div
							className="menu-slider"
							data-level={tension}
							onClick={() =>
								setTension(
									tension === "low"
										? "medium"
										: tension === "medium"
										? "max"
										: "low"
								)
							}
						>
							<div
								className="menu-slider-knob"
								style={{
									transform:
										tension === "low"
											? "translateX(0px)"
											: tension === "medium"
											? "translateX(26px)"
											: "translateX(52px)",
								}}
							/>
							<span style={{ marginLeft: 8, fontSize: 12 }}>
								{tension === "low"
									? "Low"
									: tension === "medium"
									? "Med"
									: "Max"}
							</span>
						</div>
					</div>
					<div className="menu-divider" />
					<div className="menu-item">
						📜 History of decisions
					</div>
					<div className="menu-item menu-toggle" onClick={() => setDarkMode((v) => !v)}>
						{darkMode ? "🌞" : "🌗"} Dark Mode
					</div>
					<div className="menu-item">
						🎁 Mystery Box mode
					</div>
					<div
						className="menu-item"
						onClick={() => {
							if (result) {
								navigator.clipboard.writeText(result);
								setMenuOpen(false);
							}
						}}
					>
						📤 Share my decision
					</div>
				</div>
			)}
			<div style={{ display: "flex", flex: 1, width: "100%" }}>
				{/* Mobile Hamburger Menu */}
				{mobileMenuOpen && (
					<div className="mobile-menu">
						{categories.map((cat, idx) => (
							<button
								key={cat.label}
								className={`category-btn${selectedCategory === idx ? " selected" : ""}`}
								onClick={() => {
									setSelectedCategory(idx);
									setOptions(["", ""]);
									setResult(null);
									setMobileMenuOpen(false);
								}}
							>
								{cat.label}
							</button>
						))}
					</div>
				)}
				{/* Main Content */}
				<main
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "2rem 0",
					}}
				>
					{!result ? (
						<div className="card" style={{ boxShadow: "var(--shadow)" }}>
							<h2
								style={{
									fontFamily: "var(--font-fun)",
									fontSize: "2rem",
									textAlign: "center",
									margin: "0 0 1.5rem 0",
									color: "var(--primary-dark)",
									letterSpacing: "1px",
								}}
							>
								Can't Decide?<br />Let's Roll The Dice!{" "}
								<span role="img" aria-label="thinking">
									🤔
								</span>
							</h2>
							<label
								htmlFor="category-select"
								style={{
									fontFamily: "var(--font-main)",
									fontWeight: 700,
									fontSize: "1.1rem",
									marginBottom: "0.5rem",
									display: "block",
								}}
							>
								Select a category
							</label>
							<select
								id="category-select"
								value={selectedCategory ?? ""}
								onChange={(e) => {
									setSelectedCategory(e.target.value === "" ? null : Number(e.target.value));
									setOptions(["", ""]);
								}}
								style={{ marginBottom: "1.2rem" }}
							>
								<option value="">-- Choose a category --</option>
								{categories.map((cat, idx) => (
									<option key={cat.label} value={idx}>
										{cat.label}
									</option>
								))}
							</select>
							{selectedCategory !== null && (
								<>
									<label
										style={{
											fontFamily: "var(--font-main)",
											fontWeight: 700,
											fontSize: "1rem",
											marginBottom: "0.5rem",
											display: "block",
										}}
									>
										Enter options (2-8)
									</label>
									{options.map((opt, idx) => (
										<div className="input-group" key={idx}>
											<input
												type="text"
												value={opt}
												onChange={(e) => updateOption(idx, e.target.value)}
												placeholder={`Option ${idx + 1}`}
											/>
											{options.length > 2 && (
												<button
													type="button"
													className="remove-btn"
													onClick={() => removeOption(idx)}
													aria-label="Remove option"
												>
													×
												</button>
											)}
										</div>
									))}
									<button
										type="button"
										className="add-btn"
										onClick={addOption}
										disabled={options.length >= 8}
										style={{ marginBottom: "0.5rem" }}
									>
										+ Add Option
									</button>
									<button
										type="button"
										className="btn"
										onClick={rollDice}
										disabled={options.filter((opt) => opt.trim()).length < 2 || rolling}
										style={{ marginTop: "1.2rem" }}
									>
										{rolling ? (
											<span className="dice-anim" style={{ fontSize: "1.7rem" }}>
												🎲
											</span>
										) : (
											<span style={{ fontSize: "1.7rem" }}>🎲</span>
										)}
										{rolling ? "Rolling..." : "Roll the Dice"}
									</button>
								</>
							)}
						</div>
					) : (
						<div className="result-popup">
							<div
								style={{
									fontFamily: "var(--font-fun)",
									fontSize: "2.5rem",
									fontWeight: 700,
									color: "var(--accent)",
									marginBottom: "1.2rem",
									textShadow: "0 2px 12px #7feee2",
								}}
							>
								{result}
							</div>
							{/* Decision Strength Bar */}
							<div
								style={{
									width: "100%",
									textAlign: "center",
									marginBottom: "0.5rem",
									fontWeight: 700,
								}}
							>
								Decision Strength: {strength}%
							</div>
							<div className="strength-bar">
								<div className="strength-fill" style={{ width: `${strength}%` }}></div>
							</div>
							<button
								type="button"
								className="btn"
								onClick={reset}
								style={{ marginTop: "2rem" }}
							>
								Try Again
							</button>
						</div>
					)}
				</main>
			</div>
			{/* Optional: Light pattern background visual */}
			<div
				style={{
					position: "fixed",
					inset: 0,
					pointerEvents: "none",
					zIndex: 0,
					background: "url('https://www.transparenttextures.com/patterns/cubes.png') repeat",
					opacity: 0.08,
				}}
			/>
		</div>
	);
}

/* Add these styles to your globals.css */

// Sticky Navbar
.navbar-pro {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.95);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  z-index: 200;
  min-height: 64px;
}

.navbar-title-pro {
  font-family: var(--font-fun);
  font-size: 2rem;
  color: var(--primary-dark);
  letter-spacing: 1px;
  user-select: none;
}

.menu-btn-pro {
  background: var(--primary);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.menu-btn-pro:hover {
  background: var(--primary-dark);
}

.menu-dropdown {
  position: fixed;
  top: 64px;
  right: 1rem;
  width: 320px;
  max-width: 90vw;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px #14b8a633;
  padding: 1.2rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 300;
  animation: slide-down 0.35s cubic-bezier(.68,-0.55,.27,1.55);
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-24px);}
  to { opacity: 1; transform: translateY(0);}
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-family: var(--font-main);
  color: var(--primary-dark);
  background: var(--input-bg);
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  user-select: none;
}
.menu-item:hover {
  background: var(--primary);
  color: #fff;
}

.menu-toggle {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.menu-slider {
  width: 80px;
  height: 28px;
  background: var(--accent-light);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.menu-slider[data-level="low"] { background: #b2f5ea; }
.menu-slider[data-level="medium"] { background: #7feee2; }
.menu-slider[data-level="max"] { background: #e66969; }
.menu-slider-knob {
  width: 22px;
  height: 22px;
  background: var(--primary);
  border-radius: 50%;
  transition: transform 0.2s;
}

.menu-divider {
  height: 1px;
  background: #e0f7fa;
  margin: 0.5rem 0;
  border-radius: 9999px;
}

@media (max-width: 600px) {
  .navbar-title-pro { font-size: 1.3rem; }
  .menu-dropdown { right: 0.5rem; width: 98vw; }
}
@media (max-width: 900px) {
  .hamburger-btn-pro {
    display: flex !important;
  }
  .menu-btn-pro {
    display: none !important;
  }
}
@media (min-width: 901px) {
  .hamburger-btn-pro {
    display: none !important;
  }
  .menu-btn-pro {
    display: flex !important;
  }
}
