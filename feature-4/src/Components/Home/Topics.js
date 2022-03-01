const Topics = (props) => {
    return (
        props.topics.map((e, i) => {
            // Ternary to set style of button depending on what the current topic is
            return (
              <button key={i}>
                {e}
              </button>
            );
        });
    );
}
export default Topics;