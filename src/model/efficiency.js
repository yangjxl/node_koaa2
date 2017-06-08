import config from '../config/env';
import Common from './common';

/**
 * 效率
 * @class Efficiency
 * @extends {Common}
 */
class Efficiency extends Common {
  constructor() {
    super({ index: config.elastic.efficiency_index, type: config.elastic.efficiency_type });
  }
}

export default Efficiency;
