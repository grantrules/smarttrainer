import { connectDevice, findDevice } from '.';

// implement this somewhere?
// https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html

export default class WebBluetoothDevice {
  constructor(device) {
    this.device = device;
    this.gatt = {};
  }

  async setup() {
    this.service = await findDevice(this.gatt.device)
      .then((device) => connectDevice(device))
      .then((server) => server.getPrimaryService(this.gatt.device));
  }

  read(characteristic, getValue) {
    return this.service.getCharacteristic(characteristic)
      .then((c) => c.readValue())
      .then((value) => getValue(value));
  }

  write(characteristic, data) {
    return this.service.getCharacteristic(characteristic)
      .then((c) => c.writeValue(data));
  }

  async listen(characteristic, getValue, onUpdate) {
    const c = await this.service.getCharacteristic(characteristic);
    c.addEventListener(
      'characteristicvaluechanged', (event) => {
        const value = getValue(event.target.value);
        onUpdate(value);
      },
    );
    c.startNotifications();
  }
}
