/**
 * comment controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::comment.comment',
  ({strapi}) => ({
    async create (ctx){
      const user = ctx.state.user;
      const results = await strapi
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
    },
    async update (ctx) {

      // 해당 댓글을 작성한 유저가 아니면 수정할 수 없다.
      const user = ctx.state.user;

      const comment = await strapi
        .query('api::comment.comment')
        .findOne({
          where: { id: ctx.params.id },
          populate: ['commenter']
        });

      if(comment.commenter.id !== user.id) {
        return ctx.forbidden();
      }

      return await super.update(ctx);
    },
    async delete (ctx) {

      // 해당 댓글을 작성한 유저가 아니면 삭제할 수 없다.
      const user = ctx.state.user;

      const comment = await strapi
        .query('api::comment.comment')
        .findOne({
          where: { id: ctx.params.id },
          populate: ['commenter']
        });

      if(comment.commenter.id !== user.id) {
        return ctx.forbidden();
      }

      return await super.delete(ctx);
    }
  })
);
