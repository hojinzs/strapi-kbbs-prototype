/**
 * comment service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::comment.comment', {
  async create(ctx) {
    console.log("Spy Service ::", ctx)
    return super.create(ctx)
  }
});
