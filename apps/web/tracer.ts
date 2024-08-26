import ddtracer from 'dd-trace';

const { tracer } = ddtracer;
tracer.init({
  service: process.env.CODEFLOW_PROJECT_NAME,
}); // initialized in a different file to avoid hoisting.

tracer.use('http', {
  service: process.env.CODEFLOW_SERVICE_NAME,
  enabled: true,
});
// export declare const tracer: Tracer;
export default tracer;
