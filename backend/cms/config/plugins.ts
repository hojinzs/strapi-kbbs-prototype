export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('AWS_S3_CDN_URL'),
        rootPath: env('AWS_S3_CDN_ROOT_PATH'),
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_S3_ACCESSOR_KEY_ID'),
            secretAccessKey: env('AWS_S3_ACCESSOR_SECRET'),
          },
          region: env('AWS_S3_REGION'),
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('AWS_S3_BUCKET_NAME'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
