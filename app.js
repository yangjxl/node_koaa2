import Koa from 'koa';
import mount from 'koa-mount';
import config from './src/config/env';
import logger from './src/util/logs';
import middleware from './src/middleware';
import routes from './src/router';

const app = new Koa();

app.key = ['keys', config.context_path];

// middlewares
app.use(middleware());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(mount(`/${config.context_path}`, routes()));

app.on('error', (err, ctx) => {
  logger.error({ err, method: `${ctx.method}`, path: `${ctx.path}`, params: ctx.params, query: ctx.query, body: ctx.request.body});
});

module.exports = app;
