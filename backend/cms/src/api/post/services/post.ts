/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', ({ strapi: _strapi }) => ({
  async find(params) {
    console.log("(Service) api::post.post", params)
    return await super.find({
      sort: { id: 'desc' },
      ...params
    });
  }
}));
