module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('iview')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .tap(options => {
        // modify the options...
        return { ...options, prefix: 'i-' };
      })
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/variables.scss";
        `
      }
    }
  }
};
