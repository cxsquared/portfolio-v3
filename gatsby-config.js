module.exports = {
  siteMetadata: {
    title: 'Chips and Bits',
    siteUrl: 'https://codyclaborn.me',
    colors: {
      background: '#1d1f21',
      currentLine: '#282a2e',
      selection: '#373b41',
      foreground: '#c5c8c6',
      comment: '#969896',
      red: '#cc6666',
      orange: '#de935f',
      yellow: '#f0c674',
      green: '#b5bd68',
      aqua: '#8abeb7',
      blue: '#81a2be',
      purple: '#b294bb',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://codyclaborn.me/piwik/',
        siteUrl: 'https://codyclaborn.me',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_seperator: '<!-- excerpt -->',
        plugins: [
          'gatsby-remark-responsive-iframe',
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 800,
              height: 400,
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
    `gatsby-plugin-sharp`,
  ],
}
