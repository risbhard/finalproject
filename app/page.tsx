"use client";
import React, { useState, useEffect } from "react";

const initialCategories = [
	{
		name: "🍔 Food & Snacks",
		options: ["Pizza", "Sushi"],
	},
	{
		name: "🎬 What to Watch",
		options: ["Comedy", "Horror"],
	},
	{
		name: "🎮 Things to Do",
		options: ["Play a game", "Go for a walk"],
	},
	{
		name: "👕 What to Wear",
		options: ["Hoodie", "T-shirt"],
	},
	{
		name: "🎵 Music Vibe",
		options: ["Pop", "Chill"],
	},
	{
		name: "📚 School Subject to Study",
		options: ["Math", "Science"],
	},
	{
		name: "🧘‍♀️ Self-Care / Break Ideas",
		options: ["Stretch", "Journal"],
	},
	{
		name: "📱 Who to Text/Call",
		options: ["Mom", "Best friend"],
	},
	{
		name: "📍Where to Go",
		options: ["Park", "Mall"],
	},
	{
		name: "🤷 “I’m Bored” Randomizer",
		options: ["Clean your room", "Make a meme"],
	},
];

const tips = [
	"Tip: Add more options for a better roll!",
	"Tip: You can switch between dark and light mode anytime.",
	"Tip: Try using categories for faster decisions.",
	"Tip: Remove options to narrow your choices.",
	"Tip: Decision strength helps you trust the dice!",
	"Tip: Edit options to personalize your choices.",
	"Tip: Rolling again can give you a fresh perspective.",
	"Tip: Use emojis in your options for fun!",
];

export default function HomePage() {
	const [categories, setCategories] = useState(initialCategories);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [result, setResult] = useState("");
	const [isRolling, setIsRolling] = useState(false);
	const [dice, setDice] = useState("🎲");
	const [decisionStrength, setDecisionStrength] = useState<number | null>(null);
	const [aiAnalyzing, setAiAnalyzing] = useState(false);
	const [aiReasoning, setAiReasoning] = useState(""); // NEW
	const [darkMode, setDarkMode] = useState(false);
	const [tipIdx, setTipIdx] = useState(0);
	const [fakeResult, setFakeResult] = useState<string | null>(null);
	const [showTip, setShowTip] = useState(true);
	const [showWalkthrough, setShowWalkthrough] = useState(true);

	const walkthroughSteps = [
		{
			title: "Welcome to Decision Dice!",
			desc: "This app helps you make fun, random decisions for everyday moments.",
		},
		{
			title: "Step 1: Choose a Category",
			desc: "Pick what you want to decide about—food, movies, activities, and more.",
		},
		{
			title: "Step 2: Edit Your Options",
			desc: "Add, remove, or edit options to personalize your choices.",
		},
		{
			title: "Step 3: Roll the Dice",
			desc: "Tap 'Roll Dice' and let the app randomly pick for you!",
		},
		{
			title: "Step 4: See Your Result",
			desc: "Watch the dice roll, see a fun fake-out, and get your final decision with AI reasoning.",
		},
		{
			title: "Step 5: Share or React",
			desc: "Copy & share your result, or react with emojis. Enjoy your decision!",
		},
	];
	const [walkIdx, setWalkIdx] = useState(0);

	// Add a new option
	const addOption = () => {
		setCategories(prev => {
			const updated = [...prev];
			if (updated[selectedCategory].options.length < 8) {
				updated[selectedCategory].options.push("");
			}
			return updated;
		});
	};

	// Remove an option
	const removeOption = (idx: number) => {
		setCategories(prev => {
			const updated = [...prev];
			if (updated[selectedCategory].options.length > 2) {
				updated[selectedCategory].options.splice(idx, 1);
			}
			return updated;
		});
	};

	// Edit an option
	const editOption = (idx: number, value: string) => {
		setCategories(prev => {
			const updated = [...prev];
			updated[selectedCategory].options[idx] = value;
			return updated;
		});
	}

	const rollDice = () => {
		setIsRolling(true);
		setResult("");
		setDecisionStrength(null);
		setAiAnalyzing(false);
		setAiReasoning("");
		setFakeResult(null);

		const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
		const options = categories[selectedCategory].options.filter(opt => opt.trim());

		// Pick one fake result (not the final one)
		let fakeIdx = Math.floor(Math.random() * options.length);
		const finalPickIdx = Math.floor(Math.random() * options.length);
		if (fakeIdx === finalPickIdx && options.length > 1) {
			fakeIdx = (fakeIdx + 1) % options.length;
		}
		const fakePick = options[fakeIdx];

		const rollInterval = setInterval(() => {
			const randomFace = diceFaces[Math.floor(Math.random() * diceFaces.length)];
			setDice(randomFace);
		}, 100);

		// Show fake result after 1s
		setTimeout(() => {
			setFakeResult(`Not this time: ${fakePick}`);
		}, 1000);

		// Simulate dice rolling for 2 seconds
		setTimeout(() => {
			clearInterval(rollInterval);
			setDice("🎲");
			setAiAnalyzing(true);

			// Simulate AI analysis for 1.5 seconds
			setTimeout(() => {
				const finalPick = options[finalPickIdx];
				setResult(finalPick || "No valid option!");
				setDecisionStrength(Math.floor(Math.random() * 51) + 50);
				setIsRolling(false);
				setAiAnalyzing(false);

				const reasonings = [
					"Based on your options, this seems the most fun!",
					"AI thinks this is the best choice for you right now.",
					"This option stands out for today's mood.",
					"Given your choices, this is a smart pick.",
					"AI randomly picked this, but it feels right!",
					"Trust the dice, it's got your back!",
					"Analyzing your preferences and current trends, this option is likely to bring you the most satisfaction.",
					"Factoring in variety and balance, this choice offers a good mix of excitement and comfort.",
					"Considering your recent selections, this option helps you try something new while staying in your comfort zone.",
					"AI detected a pattern in your choices and selected this to break the routine!",
					"This pick is optimized for fun, convenience, and a little surprise."
				];
				setAiReasoning(reasonings[Math.floor(Math.random() * reasonings.length)]);
				setFakeResult(null); // Hide fake result after final decision
			}, 1500);
		}, 2000);
	};

	useEffect(() => {
		setShowTip(true);
		const tipInterval = setInterval(() => {
			setTipIdx(idx => (idx + 1) % tips.length);
			setShowTip(true);
		}, 10000);

		const fadeTimeout = setTimeout(() => setShowTip(false), 5000);

		return () => {
			clearInterval(tipInterval);
			clearTimeout(fadeTimeout);
		};
	}, [tipIdx]);

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: darkMode
					? "linear-gradient(135deg, #23272f 0%, #14b8a6 100%)"
					: "linear-gradient(135deg, #7feee2 0%, #e0f7fa 100%)",
				color: darkMode ? "#f8f8f8" : "#171717",
				transition: "background 0.3s, color 0.3s",
				fontFamily: "Nunito, Arial, sans-serif",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Animated Blobs */}
			<div style={{
				position: "absolute",
				top: "-120px",
				left: "-120px",
				width: "300px",
				height: "300px",
				background: "radial-gradient(circle at 60% 40%, #14b8a6 0%, #7feee2 80%)",
				borderRadius: "50%",
				opacity: 0.35,
				filter: "blur(12px)",
				animation: "blob1 12s ease-in-out infinite alternate",
				zIndex: 0,
			}} />
			<div style={{
				position: "absolute",
				bottom: "-100px",
				right: "-100px",
				width: "220px",
				height: "220px",
				background: "radial-gradient(circle at 40% 60%, #e66969 0%, #14b8a6 80%)",
				borderRadius: "50%",
				opacity: 0.28,
				filter: "blur(10px)",
				animation: "blob2 14s ease-in-out infinite alternate",
				zIndex: 0,
			}} />
			{/* Subtle pattern overlay */}
			<div style={{
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				background: "url('https://www.transparenttextures.com/patterns/cubes.png') repeat",
				opacity: darkMode ? 0.07 : 0.12,
				zIndex: 0,
			}} />
			{/* Main content box */}
			<main
				style={{
					position: "relative",
					textAlign: "center",
					padding: typeof window !== "undefined" && window.innerWidth < 600 ? "1.2rem 0.5rem" : "2.5rem 2rem",
					background: darkMode ? "#23272f" : "#fff",
					borderRadius: "32px",
					boxShadow: "0 8px 32px rgba(20, 184, 166, 0.15)",
					maxWidth: "480px",
					width: typeof window !== "undefined" && window.innerWidth < 600 ? "98vw" : "100%",
					transition: "background 0.3s",
					border: darkMode ? "1px solid #14b8a6" : "none",
					zIndex: 1,
					boxSizing: "border-box",
				}}
			>
				{/* Dark/Light mode toggle button */}
				<button
					onClick={() => setDarkMode(v => !v)}
					style={{
						position: "absolute",
						top: 18,
						right: 18,
						background: darkMode ? "#f8f8f8" : "#14b8a6",
						color: darkMode ? "#14b8a6" : "#fff",
						border: "none",
						borderRadius: "50%",
						width: "44px",
						height: "44px",
						fontSize: "1.7rem",
						cursor: "pointer",
						boxShadow: "0 2px 8px #14b8a633",
						transition: "background 0.3s, color 0.3s",
						zIndex: 10,
					}}
					aria-label="Toggle dark mode"
				>
					{darkMode ? "🌞" : "🌗"}
				</button>

				<h1
					style={{
						fontSize: "2.3rem",
						marginBottom: "24px",
						fontWeight: 800,
						letterSpacing: "1px",
						color: darkMode ? "#7feee2" : "#14b8a6",
						fontFamily: "Nunito, Arial, sans-serif",
					}}
				>
					Decision Dice <span style={{ fontSize: "2.1rem" }}>🎲</span>
				</h1>

				<div style={{ marginBottom: "24px" }}>
					<label
						htmlFor="category-select"
						style={{
							fontWeight: "bold",
							marginRight: "10px",
							fontSize: "1.1rem",
							color: darkMode ? "#7feee2" : "#14b8a6",
						}}
					>
						Choose a category:
					</label>
					<select
						id="category-select"
						value={selectedCategory}
						onChange={e => {
							setSelectedCategory(Number(e.target.value));
							setResult("");
						}}
						style={{
							fontSize: "18px",
							padding: "8px 16px",
							borderRadius: "12px",
							border: "2px solid #14b8a6",
							background: darkMode ? "#23272f" : "#f8f8f8",
							color: darkMode ? "#7feee2" : "#171717",
							cursor: "pointer",
							boxShadow: "0 2px 8px #14b8a622",
							transition: "background 0.3s, color 0.3s",
						}}
					>
						{categories.map((cat, idx) => (
							<option key={cat.name} value={idx}>
								{cat.name}
							</option>
						))}
					</select>
				</div>

				<div style={{ marginBottom: "24px" }}>
					<div
						style={{
							fontWeight: "bold",
							marginBottom: "10px",
							fontSize: "1.1rem",
							color: darkMode ? "#7feee2" : "#14b8a6",
						}}
					>
						Options (2–8):
					</div>
					{categories[selectedCategory].options.map((opt, idx) => (
						<div
							key={idx}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: 10,
							}}
						>
							<input
								type="text"
								value={opt}
								onChange={e => editOption(idx, e.target.value)}
								placeholder={`Option ${idx + 1}`}
								style={{
									fontSize: "17px",
									padding: "8px 14px",
									borderRadius: "10px",
									border: "2px solid #b2f5ea",
									marginRight: "10px",
									minWidth: "140px",
									background: darkMode ? "#23272f" : "#f8f8f8",
									color: darkMode ? "#7feee2" : "#171717",
									transition: "background 0.3s, color 0.3s",
								}}
							/>
							{categories[selectedCategory].options.length > 2 && (
								<button
									type="button"
									onClick={() => removeOption(idx)}
									style={{
										background: "#e66969",
										color: "#fff",
										border: "none",
										borderRadius: "50%",
										width: "28px",
										height: "28px",
										cursor: "pointer",
										fontWeight: "bold",
										fontSize: "18px",
										lineHeight: "28px",
										textAlign: "center",
										boxShadow: "0 2px 8px #e6696922",
									}}
									aria-label="Remove option"
								>
									×
								</button>
							)}
						</div>
					))}
					<button
						type="button"
						onClick={addOption}
						disabled={categories[selectedCategory].options.length >= 8}
						style={{
							marginBottom: "8px",
							padding: "7px 22px",
							borderRadius: "9999px",
							background: "#7feee2",
							color: "#171717",
							border: "none",
							fontSize: "17px",
							cursor:
								categories[selectedCategory].options.length < 8
									? "pointer"
									: "not-allowed",
							marginTop: "10px",
							boxShadow: "0 2px 8px #7feee222",
							fontWeight: "bold",
						}}
					>
						+ Add Option
					</button>
				</div>

				<div
					style={{
						fontSize: "5rem",
						transition: "transform 0.3s",
						marginBottom: "10px",
						color: darkMode ? "#7feee2" : "#14b8a6",
						textShadow: darkMode
							? "0 2px 12px #14b8a6"
							: "0 2px 12px #7feee2",
					}}
				>
					{dice}
				</div>

				<button
					onClick={rollDice}
					disabled={
						isRolling ||
						categories[selectedCategory].options.filter(opt => opt.trim()).length < 2
					}
					style={{
						marginTop: "20px",
						padding: "13px 36px",
						fontSize: "20px",
						borderRadius: "9999px",
						cursor:
							isRolling ||
							categories[selectedCategory].options.filter(opt => opt.trim()).length < 2
								? "not-allowed"
								: "pointer",
						backgroundColor: isRolling ? "#b2f5ea" : "#14b8a6",
						color: isRolling ? "#14b8a6" : "#fff",
						border: "none",
						boxShadow: "0 2px 8px #14b8a622",
						fontWeight: "bold",
						letterSpacing: "1px",
						transition: "background 0.3s, color 0.3s",
					}}
				>
					{isRolling ? (
						<span
							style={{
								display: "inline-block",
								animation: "spin-dice 0.8s linear infinite",
								fontSize: 28,
							}}
						>
							🎲
						</span>
					) : (
						<span style={{ fontSize: 28 }}>🎲</span>
					)}
					{isRolling ? " Rolling..." : " Roll Dice"}
				</button>

				{/* AI analysis step */}
				{aiAnalyzing && (
					<div
						style={{
							marginTop: "30px",
							fontSize: "22px",
							color: darkMode ? "#7feee2" : "#14b8a6",
							fontWeight: "bold",
							letterSpacing: "1px",
						}}
					>
						🤖 AI is thinking about your options...
					</div>
				)}

				{/* Show result only when not analyzing */}
				{result && !aiAnalyzing && (
					<div
						style={{
							marginTop: "30px",
							fontSize: "24px",
							background: darkMode ? "#23272f" : "#f8f8f8",
							borderRadius: "18px",
							padding: "1.5rem 1rem",
							boxShadow: "0 2px 12px #14b8a622",
							color: darkMode ? "#7feee2" : "#14b8a6",
							fontWeight: "bold",
							animation: "fade-in 0.7s",
						}}
					>
						🎉 Your decision is: <strong>{result}</strong>
						{decisionStrength !== null && (
							<div style={{ marginTop: "18px" }}>
								<div
									style={{
										fontSize: "16px",
										marginBottom: "6px",
										fontWeight: "bold",
										color: darkMode ? "#7feee2" : "#14b8a6",
									}}
								>
									Decision Strength: {decisionStrength}%
								</div>
								<div
									style={{
										width: "220px",
										height: "18px",
										background: darkMode ? "#23272f" : "#e0f7fa",
										borderRadius: "999px",
										margin: "0 auto",
										overflow: "hidden",
										boxShadow: "0 2px 8px #14b8a622",
										position: "relative",
									}}
								>
									<div
										style={{
											height: "100%",
											width: `${decisionStrength}%`,
											background:
												"linear-gradient(90deg, #e66969 0%, #14b8a6 100%)",
											borderRadius: "999px",
											transition:
												"width 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
										}}
									/>
								</div>
							</div>
						)}
						{/* AI Reasoning */}
						{aiReasoning && (
							<div
								style={{
									marginTop: "18px",
									fontSize: "18px",
									color: darkMode ? "#7feee2" : "#008080",
									fontStyle: "italic",
									fontWeight: "normal",
								}}
							>
								🤖 {aiReasoning}
							</div>
						)}
					</div>
				)}

				{/* Show fake result above the final result */}
				{fakeResult && (
					<div
						style={{
							marginTop: "24px",
							fontSize: "20px",
							color: darkMode ? "#e66969" : "#14b8a6",
							fontWeight: "bold",
							animation: "fade-in 0.7s",
						}}
					>
						{fakeResult}
					</div>
				)}
			</main>

			{/* Responsive Floating helpful tip box */}
			{showTip && (
				<div
					style={{
						position: "fixed",
						bottom: 24,
						left: 24,
						right: "auto",
						background: darkMode ? "#23272f" : "#e0f7fa",
						color: darkMode ? "#7feee2" : "#14b8a6",
						borderRadius: "18px",
						boxShadow: "0 2px 12px #14b8a622",
						padding: "0.8rem 1rem",
						fontSize: "1rem",
						fontWeight: 500,
						opacity: showTip ? 0.95 : 0,
						transition: "opacity 0.7s",
						zIndex: 50,
						maxWidth: "90vw",
						width: "320px",
						display: "flex",
						alignItems: "center",
						gap: "0.7rem",
						boxSizing: "border-box",
						...(window.innerWidth < 600
							? { left: "50%", bottom: 80, transform: "translateX(-50%)", width: "90vw", maxWidth: "95vw" }
							: {}),
					}}
				>
					<span style={{ fontSize: "1.5rem" }}>💡</span>
					<span style={{ wordBreak: "break-word" }}>{tips[tipIdx]}</span>
				</div>
			)}

			{/* Responsive Floating Share Result Button */}
			{result && !aiAnalyzing && (
				<div
					style={{
						position: "fixed",
						bottom: 24,
						right: 24,
						left: "auto",
						zIndex: 50,
						display: "flex",
						alignItems: "center",
						boxSizing: "border-box",
						// Responsive: move to top if screen is small
						...(window.innerWidth < 600
							? { right: "50%", bottom: 24, transform: "translateX(50%)", width: "90vw", maxWidth: "95vw", justifyContent: "flex-end" }
							: {}),
					}}
				>
					<button
						onClick={() => {
							const params = new URLSearchParams({
								result,
								strength: decisionStrength?.toString() ?? "",
								reasoning: aiReasoning,
							});
							const shareText = `Decision Dice Result: ${result}\nStrength: ${decisionStrength ?? ""}%\n${aiReasoning ? "AI Reasoning: " + aiReasoning : ""}\nShareable URL: ${window.location.origin}/?${params.toString()}`;
							navigator.clipboard.writeText(shareText);
							alert("Result and shareable URL copied to clipboard!");
						}}
						style={{
							padding: "0.8rem 1rem",
							borderRadius: "18px",
							background: darkMode ? "#23272f" : "#e0f7fa",
							color: darkMode ? "#7feee2" : "#14b8a6",
							boxShadow: "0 2px 12px #14b8a622",
							fontSize: "1rem",
							fontWeight: 600,
							cursor: "pointer",
							border: "none",
							transition: "background 0.3s, color 0.3s",
							display: "flex",
							alignItems: "center",
							gap: "0.7rem",
							width: "100%",
							maxWidth: "320px",
						}}
						aria-label="Copy and share result"
					>
						<span style={{ fontSize: "1.5rem" }}>🔗</span>
						Copy & Share Result
					</button>
				</div>
			)}

			{/* Walkthrough Overlay */}
			{showWalkthrough && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(20,184,166,0.13)",
						zIndex: 1000,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							background: darkMode ? "#23272f" : "#fff",
							color: darkMode ? "#7feee2" : "#14b8a6",
							borderRadius: "24px",
							boxShadow: "0 4px 24px #14b8a622",
							padding: "2rem 1.5rem",
							maxWidth: "90vw",
							width: "370px",
							textAlign: "center",
							fontFamily: "Nunito, Arial, sans-serif",
						}}
					>
						<h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
							{walkthroughSteps[walkIdx].title}
						</h2>
						<p style={{ fontSize: "1.08rem", marginBottom: "1.5rem" }}>
							{walkthroughSteps[walkIdx].desc}
						</p>
						<div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
							{walkIdx > 0 && (
								<button
									onClick={() => setWalkIdx(walkIdx - 1)}
									style={{
										padding: "0.5rem 1.2rem",
										borderRadius: "999px",
										border: "none",
										background: "#7feee2",
										color: "#171717",
										fontWeight: 700,
										cursor: "pointer",
									}}
								>
									Back
								</button>
							)}
							{walkIdx < walkthroughSteps.length - 1 ? (
								<button
									onClick={() => setWalkIdx(walkIdx + 1)}
									style={{
										padding: "0.5rem 1.2rem",
										borderRadius: "999px",
										border: "none",
										background: "#14b8a6",
										color: "#fff",
										fontWeight: 700,
										cursor: "pointer",
									}}
								>
									Next
								</button>
							) : (
								<button
									onClick={() => setShowWalkthrough(false)}
									style={{
										padding: "0.5rem 1.2rem",
										borderRadius: "999px",
										border: "none",
										background: "#e66969",
										color: "#fff",
										fontWeight: 700,
										cursor: "pointer",
									}}
								>
									Got it!
								</button>
							)}
						</div>
						<div style={{ marginTop: "1.2rem", fontSize: "0.95rem", opacity: 0.7 }}>
							Step {walkIdx + 1} of {walkthroughSteps.length}
						</div>
					</div>
				</div>
			)}

			{/* Add keyframes for dice and fade-in animation */}
			<style>{`
				@keyframes spin-dice {
					0% { transform: rotate(0deg);}
					100% { transform: rotate(360deg);}
				}
				@keyframes fade-in {
					from { opacity: 0; transform: scale(0.9);}
					to { opacity: 1; transform: scale(1);}
				}
				@keyframes blob1 {
					0% { transform: scale(1) translate(0,0);}
					100% { transform: scale(1.15) translate(40px, 60px);}
				}
				@keyframes blob2 {
					0% { transform: scale(1) translate(0,0);}
					100% { transform: scale(1.1) translate(-30px, -40px);}
				}
			`}</style>
		</div>
	);
}

// Remove CSS from this file and add it to your globals.css or another CSS file.
