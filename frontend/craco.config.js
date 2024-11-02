// craco.config.js
module.exports = {
    style: {
      sass: {
        loaderOptions: {
          sassOptions: {
            silenceDeprecations: ['legacy-js-api'],
          },
        },
      },
    },
};