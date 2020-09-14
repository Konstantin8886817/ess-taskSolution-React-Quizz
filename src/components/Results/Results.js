import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';

export default function Results({ score, count, onRefresh }) {
    const [results, setResults] = useState([]);

    function saveAndUpdate() {
        const data = [...results, {score,count}];
        localStorage.setItem("result", JSON.stringify(data));
        onRefresh();
    }

    useEffect(()=>{
        const data = localStorage.getItem("result");
        if(data != null){
            setResults(JSON.parse(data));
        }
    },[]);

    return (
        <>
            <div className={classes.score_section}>
                You scored {score} out of {count}

            </div>

            <button className={classes.btn} onClick={saveAndUpdate}>Again</button>

            <ul>
                {results.map((result, index) => <li key={index}>{index + 1} - You scored {result.score} out of {result.count}</li>)}
            </ul>
        </>
    );
}