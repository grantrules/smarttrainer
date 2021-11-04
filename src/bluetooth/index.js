const findDevice = async (type) => navigator.bluetooth.requestDevice({
  filters: [{ services: [type] }],
});

const connectDevice = async (device) => device.gatt.connect();

export { findDevice, connectDevice };
