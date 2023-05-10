import './Results.scss';
import JsonView from 'react18-json-view';

function Results (props) {
  return (
    <section>
      <JsonView src={props.data} />
    </section>
  );
}

export default Results;