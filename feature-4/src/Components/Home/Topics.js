const Topics = (props) => {
    // Ternary to show loading text when topics is undefined
    return (
        <div className="topic">
            {
                props.topics? 
                <><div style={{fontSize: "1.5rem", padding: "0.5rem"}}>Topic:</div><select value={props.currentTopic} onChange={props.onTopicChange}>
                    {
                        props.topics.map((e, i) => {return <option key={i} value={e}>{e}</option>})
                    }
                </select></> : <h2>Loading topics...</h2>
            }
        </div>
    );
}
export default Topics;