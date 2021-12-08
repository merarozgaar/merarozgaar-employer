// @flow
import React from 'react';

type LoaderType = () => React$Node;

const Loader: LoaderType = () => (
  <div className="loader bg-light">
    {/*<div className="drop" />*/}
    {/*<div className="wave" />*/}
    <div className="pulse" />
  </div>
);

export default Loader;
