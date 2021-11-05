import WebBluetoothDevice from '../WebBluetoothDevice';

export default class FitnessMachine extends WebBluetoothDevice {
  constructor() {
    super();
    this.gatt = {
      device: 'fitness_machine',
      characteristics: ['heart_rate_measurement'],
    };
  }

  /*
  async isBike() {
    const value = await this.readFitnessMachineFeature();
    return value === 64;
  }
  */

  async writeFitnessMachineControlPoint(data) {
    this.write('fitness_machine_control_point', data);
  }

  async readSupportedResistanceLevelRange() {
    const getValue = (value) => value.getInt8(1);
    return this.read('supported_resistance_level_range', getValue);
  }

  async readSupportedPowerRange() {
    const getValue = (value) => value.getInt8(1);
    return this.read('supported_power_range', getValue);
  }

  async readFitnessMachineFeature() {
    const getValue = (value) => value.getInt32(1, true);
    return this.read('fitness_machine_feature', getValue);
  }

  listenIndoorBikeData(onUpdate) {
    const getValue = (value) => value.getInt8(1);
    this.listen('indoor_bike_data', getValue, onUpdate);
  }

  listenTrainingStatus(onUpdate) {
    const getValue = (value) => value.getInt8(1);
    this.listen('training_status', getValue, onUpdate);
  }

  listenFitnessMachineStatus(onUpdate) {
    const getValue = (value) => value.getInt8(1);
    this.listen('fitness_machine_status', getValue, onUpdate);
  }

  listenHeartRate(onUpdate) {
    const getValue = (value) => value.getInt8(1);
    this.listen('heart_rate_measurement', getValue, onUpdate);
  }
}
