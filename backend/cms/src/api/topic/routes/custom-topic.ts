
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/topics/:slug([a-z]+)',
      handler: 'api::topic.topic.findBySlug', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
        policies: []
      },
    },
  ],
}
