/**
 * comment router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::comment.comment', {
  config: {
    update: {
      policies: ['global::is-authenticated']
    },
    delete: {
      policies: ['global::is-authenticated']
    },
  }
});
