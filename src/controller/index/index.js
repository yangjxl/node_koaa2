// import moment from 'moment';
import Router from 'koa-router';
import _ from 'lodash';
import request from '../../util/request';
import Performance from '../../model/performance';


/* eslint no-underscore-dangle: ["error", { "allow": ["exchangeRecord_", "_source"] }] */
const router = new Router();
const performance = new Performance();
router
  .get('/aaa', async (ctx) => {
    const params = {};
    params.terminal = 'PC';
    const isReqTier = 1;
    const aaa = await performance.aggBySys(params, isReqTier);
    ctx.body = aaa;
  })
  .get('/qqqq', async (ctx) => {
    console.log(111111111);
    console.log(ctx);
    const aaa = await performance.searchByTest();
    console.log(555555555);
    console.log(aaa);
    ctx.body = aaa;
  })
  //
  .get('/getSystemUserOptTime/:id', async (ctx) => {
    const id = ctx.params.id;
    console.log(id);
    ctx.body = 'chenggong';
  })
    //
  .post('/bbb/:id', async (ctx) => {
    const id = ctx.params.id;
    console.log(id);
    ctx.body = 'chenggong';
  })
  .post('/ccc', async (ctx) => {
    console.log('================');
    const params = ctx.request.body;
    console.log(params);
    ctx.body = 'chenggong';
  })
  ;
export default router;
