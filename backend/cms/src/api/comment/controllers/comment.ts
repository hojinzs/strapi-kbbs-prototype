/**
 * comment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::comment.comment',
  ({strapi}) => ({
    async create (ctx){
      const user = ctx.state.user;
      const { results } = await strapi
        .service('api::comment.comment')
        .create({
          ...ctx.request.body,
          data: {
            ...ctx.request.body.data,
            commenter: user.id
          }
        })

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults);

    }
  })
);
