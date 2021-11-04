import { connectDevice, findDevice } from '.';

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

  listen(characteristic, getValue, onUpdate) {
    this.service.getCharacteristic(
      characteristic,
    );

    characteristic.startNotifications();
    characteristic.addEventListener(
      'characteristicvaluechanged', (event) => {
        const value = getValue(event.target.value);
        onUpdate(value);
      },
    );
  }
}
