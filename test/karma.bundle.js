var context = require.context('../app/tests', true, /-test\.[t,j]sx?$/);
context.keys().forEach(context);
module.exports = context;

