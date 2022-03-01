const Topics = (props) => {
    // Ternary to show loading text when topics is undefined
    return (
        props.topics ? props.topics.map((e, i) => {
            // Ternary to set style of button depending on what the current topic is
            return (
              <button key={i}>
                {e}
              </button>
            );
        }) : <h1 style={{ textAlign: "center" }}>Loading topics...</h1>
    );
}
export default Topics;