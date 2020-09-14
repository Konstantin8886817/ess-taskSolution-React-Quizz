import React, { useState } from "react";
import Results from "../Results/Results";
import classes from "./Quiz.module.css";

export default function Quiz({questions, onRefresh}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className={classes.Quiz}>
			{showScore ? (
				<Results score={score} count={questions.length} onRefresh={onRefresh}/>
			) : (
				<>
					<div className={classes.question_section}>
						<div className={classes.question_count}>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className={classes.question_text}>{questions[currentQuestion].questionText}</div>
					</div>
					<div className={classes.answer_section}>
						{questions[currentQuestion].answerOptions.map((answerOption,index) => (
							<button key={index} className={classes.button} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}