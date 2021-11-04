import WebBluetoothDevice from '../WebBluetoothDevice';

export default class HeartRate extends WebBluetoothDevice {
  constructor() {
    super();
    this.gatt = {
      device: 'heart_rate',
      characteristics: ['heart_rate_measurement'],
    };
  }

  listenHeartRate(onUpdate) {
    const getValue = (value) => value.getInt8(1);
    this.listen('heart_rate_measurement', getValue, onUpdate);
  }
}
