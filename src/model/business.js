import config from '../config/env';
import Common from './common';

/**
 * 业务
 * @class Business
 * @extends {Common}
 */
class Business extends Common {
  constructor() {
    super({ index: config.elastic.business_index, type: config.elastic.business_type });
  }
}

export default Business;
