import moment from 'moment';
import _ from 'lodash';
import config from '../config/env';
import Common from './common';

/* eslint no-underscore-dangle: ["error", { "allow": ["exchangeRecord_", "_scroll_id", "_source"] }] */

/**
 * 性能
 * @class Performance
 * @extends {Common}
 */
class Performance extends Common {

  constructor() {
    super({ index: config.elastic.performance_index, type: config.elastic.performance_type });
  }
  /**
     * 聚合用户所有系统的平均操作时间
     * @param {any} employeeId 用户工号
     * @param {any} hour 查询小时，当前时间的历史时间段内
     * @param {any} t 终端
     * @returns
     * @memberOf Performance
     */

  aggBySys(params, isReqTier) {
    // 查询条件
    const bool = {
      must: [],
      must_not: [],
      filter: []
    };
    if (isReqTier) bool.must.push({ term: { reqTier: 1 } });
    else bool.must_not.push({ term: { reqTier: 1 } });
    if (params.employeeId) bool.filter.push({ term: { employeeId: params.employeeId } });
    if (params.terminal) bool.filter.push({ term: { terminal: params.terminal } });
    if (params.startTime) {
      const range = {
        range: {
          featureTime: {
            from: +(params.startTime)
          }
        }
      };
      if (params.endTime) range.range.featureTime.to = +(params.endTime);
      bool.filter.push(range);
    }
    const query = {
      body: {
        size: 0,
        query: {
          bool
        },
        aggs: {
          system: {
            terms: {
              field: 'systemTag',
              size: 500
            },
            aggs: {
              avg_time: {
                avg: {
                  field: 'consumeTime'
                }
              }
            }
          }
        }
      }
    };
    return super.search(query);
  }
  // 查询饼图的数据
  searchByPie() {
    console.log(222222222);
    const query = {
      size: 0,
      query: {
        bool: {
          must: [
            {
              query_string: {
                analyze_wildcard: true,
                query: '*'
              }
            },
            {
              range: {
                timestamp: {
                  gte: 1496246400000,
                  lte: 1498838399999,
                  format: 'epoch_millis'
                }
              }
            }
          ]
        }
      },
      aggs: {
        log_type_agg: {
          terms: {
            field: 'log_type',
            order: {
              _count: 'desc'
            }
          }
        }
      }
    };
    console.log(query);
    return super.search(query);
  }
  searchTest() {
    const query = {
      size: 5,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: '*'
              }
            }
          ]
        }
      }
    };
    return super.search(query);
  }
  searchByTest() {
    const query = {
      body: {
        size: 0,
        query: {
          bool: {
            must: [
              {
                query_string: {
                  analyze_wildcard: true,
                  query: '*'
                }
              },
              {
                range: {
                  timestamp: {
                    gte: 1496246400000,
                    lte: 1498838399999,
                    format: 'epoch_millis'
                  }
                }
              }
            ],
            must_not: []
          }
        },
        _source: {
          excludes: []
        },
        aggs: {
          2: {
            terms: {
              field: 'log_type',
              size: 10,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      }
    };
    return super.search(query);
  }
}

export default Performance;
