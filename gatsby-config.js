module.exports = {
  siteMetadata: {
    title: `Napoli Café`,
      menuLinks: [
          {
            name: 'Tapes',
            link: '/'
          },
          {
            name: 'Napoli Nel Cuore',
            link: 'napolinelcoure'
            },
        {
          name: 'Shop',
          link: 'shop'
        },
          ],
    author: `John Örberg`,
    description: `Napoli sound, saved on tape - served digital.`,
    siteUrl: `https://www.napoli-cafe.com/`,
    social: {
      twitter: ``,
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
  
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },      
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/content/assets/images`,
          name: `images`,
      },
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/products`,
        name: `products`,
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
            
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-150856359-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Napoli-Café`,
        short_name: `Napoli-Café`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
