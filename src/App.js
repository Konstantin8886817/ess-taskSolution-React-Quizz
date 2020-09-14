import React, { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";
import Quiz from "./components/Quiz/Quiz";

export default function App() {
	const [pending, setPending] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [refreshToggle,setRefreshToggle] = useState(true);

	function getQuestions() {
		return fetch("/data.json")
		.then(response => response.json());
	}

	const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));

	useEffect(() => {
		setPending(true);
		async function fetchData(){
			await sleep(5000);
			const data = await getQuestions();
			setQuestions(data);
			setPending(false);
		}
		fetchData();
	},[refreshToggle]);
	
	return (
		<div>
			<h1>Quizz App</h1>
			{pending ? <Loading /> : <Quiz questions={questions} onRefresh={() => setRefreshToggle(!refreshToggle)}/> }
		</div>
	)
}

	
