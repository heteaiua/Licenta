import React from "react";
import Select from "react-select";

const options = [{ value: "Frigider", label: "Chocolate" }];

export default () => (
  <Select
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);
