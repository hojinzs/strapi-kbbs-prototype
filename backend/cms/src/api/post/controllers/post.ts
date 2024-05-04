/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::post.post',
  ({strapi}) => ({
    async create (ctx){
      const user = ctx.state.user;
      const results = await strapi
        .service('api::post.post')
        .create({
          ...ctx.request.body,
          data: {
            ...ctx.request.body.data,
            // 작성자로 유저 ID를 넣어준다.
            author: user.id
          }
        })

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults);

    },
    async update (ctx) {
      // 해당 게시물을 작성한 유저가 아니면 수정할 수 없다.
      const user = ctx.state.user;

      const post = await strapi
        .query('api::post.post')
        .findOne({
          where: { id: ctx.params.id },
          populate: ['author']
        });

      if(post.author.id !== user.id) {
        return ctx.forbidden();
      }

      return await super.update(ctx);
    },
    async delete (ctx) {

      // 해당 게시물을 작성한 유저가 아니면 삭제할 수 없다.
      const user = ctx.state.user;

      const post = await strapi
        .query('api::post.post')
        .findOne({
          where: { id: ctx.params.id },
          populate: ['author']
        });

      if(post.author.id !== user.id) {
        return ctx.forbidden();
      }

      return await super.delete(ctx);
    }
  })
);
