import './Results.scss'

function Results (props) {
  return (
    <section>
      <pre data-testid="results-test">{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
    </section>
  );
}

export default Results;