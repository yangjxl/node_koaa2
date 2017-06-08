import Elastic from '../util/elastic';

class Common {
  constructor(opts) {
    this.elastic = new Elastic(opts);
  }
  get(params) {
    return this.elastic.get(params);
  }
  search(params) {
    return this.elastic.search(params);
  }
  // search() {
  //   return this.elastic.search();
  // }
  scroll(params) {
    return this.elastic.scroll(params);
  }
}

export default Common;
