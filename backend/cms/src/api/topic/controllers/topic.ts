/**
 * topic controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::topic.topic', {
  async findBySlug (ctx) {
    const results = await strapi
      .query('api::topic.topic')
      .findOne({
        where: { slug: ctx.params.slug }
      });

    if(!results) {
      return ctx.notFound();
    }

    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults);
  },
});
