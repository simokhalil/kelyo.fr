require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Kelyo`,
    description: `Développeur Web et Mobile multi-platefomes, je suis consultant sur les nouvelles technos (Javascript, ReactJS / React Native, Angular, NodeJS) sur Nantes et alentours`,
    author: `Khalil EL ISMAILI`,
    siteUrl: `https://www.kelyo.fr`,
    keywords: `site,web,personnel,khalil,elismaili,el,ismaili,kelyo,kelyo.fr,cv,resume,portfolio,developpeur,developer,javascript,react,native,mobile,lead,dev`,
    image: '/images/khalil_el_ismaili.jpg',
    menus: {
      resume: !!+process.env.RESUME,
      contact: !!+process.env.CONTACT,
      blog: !!+process.env.BLOG,
    },
    disqusShortName: process.env.DISQUS_SHORT_NAME,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-vscode`,
          // All options are optional. Defaults shown here.
          options: {
            colorTheme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
            // wrapperClassName: '',  // Additional class put on 'pre' tag
            injectStyles: true,    // Injects (minimal) additional CSS for layout and scrolling
            extensions: [],        // Extensions to download from the marketplace to provide more languages and themes
            // languageAliases: {},   // Map of custom/unknown language codes to standard/known language codes
            // replaceColor: x => x,  // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
            /* getLineClassName: ({   // Function allowing dynamic setting of additional class names on individual lines
              content,             //   - the string content of the line
              index,               //   - the zero-based index of the line within the code fence
              language,            //   - the language specified for the code fence
              codeFenceOptions     //   - any options set on the code fence alongside the language (more on this later)
            }) => '', */
          },
        }],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kelyo`,
        short_name: `Kelyo`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-142692655-1',
        head: false, // Defines where to place the tracking script - `true` in the head and `false` in the body
        // anonymize: false, // Setting this parameter is optional
        // respectDNT: false, // Setting this parameter is also optional
        // exclude: ["/preview/**", "/do-not-track/me/too/"], // Avoids sending pageview hits from custom paths
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID", // Enables Google Optimize using your container Id
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID", // Enables Google Optimize Experiment ID
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID", // Set Variation ID. 0 for original 1,2,3....
        // Any additional create only fields (optional)
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "kelyo.fr",
      },
    },
    `gatsby-plugin-sitemap`,
    { // optimized images
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        enableIdentityWidget: true,
        htmlTitle: `Content Manager - Kelyo`,
      },
    },
    { // Blog posts
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/blog/posts`,
      },
    },
    { // Blog categories
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/content/blog/categories`,
      },
    },
    { // Blog tags
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tags`,
        path: `${__dirname}/content/blog/tags`,
      },
    },
    { // static site pages
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages_content`,
        path: `${__dirname}/content/site`,
      },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layout/layout.js`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
