import React from "react";
import { connect } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = ({ filter }) => {
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    filter({ filter: filterValue });
  };

  return (
    <div>
      filter <input onChange={handleFilter} />
    </div>
  );
};

const ConnectedFilter = connect(null, { filter })(Filter);
export default ConnectedFilter;
