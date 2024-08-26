import ddtracer from 'dd-trace';
import { logger } from 'apps/web/src/utils/logger';

const { tracer } = ddtracer;
tracer.init({
  service: process.env.CODEFLOW_PROJECT_NAME,
  // Enables tracking performance trends across versions. Using commit hash as
  // code changes most often result in performance changes (vs deploys).
  //
  // Codeflow Docs: https://confluence.coinbase-corp.com/pages/viewpage.action?pageId=1172681623
  // Datadog Docs: https://datadoghq.dev/dd-trace-js/
  version: process.env.CODEFLOW_COMMIT_HASH,
  profiling: true,
  logInjection: true,
  startupLogs: true,
  logger: {
    error: (err) => logger.error(err),
    warn: (message) => logger.warn(message),
    info: (message) => logger.info(message),
    debug: (message) => logger.debug(message),
  },
  dogstatsd: {
    hostname: '10.166.21.89',
  },
});

tracer.use('http', {
  enabled: true,
});

export default tracer;
