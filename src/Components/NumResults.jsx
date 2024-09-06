function NumResults({ length }) {
  return (
    <div className="num-results">Found {length ? length : "0"} results.</div>
  );
}

export default NumResults;
