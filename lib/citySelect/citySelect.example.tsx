import * as React from 'react';
import CitySelect from './citySelect';
import {cityAll} from './city';

const CitySelectExample: React.FunctionComponent = () => {
  return (
    <>
      <div>
        <h2>第一个例子</h2>
        <CitySelect dataSource={cityAll} onChange={(cityName) => {
          console.log(cityName);
        }}>选择城市</CitySelect>
      </div>
    </>)
};
export default CitySelectExample;
