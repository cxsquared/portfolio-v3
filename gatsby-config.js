module.exports = {
  siteMetadata: {
    title: 'Chips and Bits',
    siteUrl: 'https://codyclaborn.me',
    disqus: {
      shortname: 'codyclaborn',
    },
    twitter: 'cxsquared',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://matomo.codyclaborn.me',
        siteUrl: 'https://codyclaborn.me',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: '<!-- excerpt -->',
        plugins: [
          'gatsby-remark-responsive-iframe',
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '±',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              ignoreFileExtensions: [],
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              withWebp: true,
              showCaptions: true,
              quality: 100,
            },
          },
        ],
      },
    },
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/assets/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/kanye/*'],
      },
    },
    `gatsby-plugin-meta-redirect`,
  ],
}
