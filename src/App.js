import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import HeartRate from './bluetooth/devices/HeartRate';

function App() {
  return (
    <div>
      Heart rate sensor
      <Sensor Device={HeartRate} deviceName="heart_rate" />
    </div>
  );
}

function Sensor({ Device, deviceName }) {
  const [device] = useState(new Device());

  async function setup() {
    await device.setup();
  }
  return (
    <div>
      {deviceName}
      <button onClick={setup} type="button">connect</button>
    </div>
  );
}

Sensor.propTypes = {
  Device: PropTypes.func.isRequired,
  deviceName: PropTypes.string.isRequired,
};

export default App;
