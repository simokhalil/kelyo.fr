/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const pages = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

    const template = path.resolve("src/templates/post.jsx");

    pages.data.allPrismicPost.edges.forEach(edge => {
        createPage({
            path: `/blog/${edge.node.uid}`,
            component: template,
            context: {
                uid: edge.node.uid,
            },
        });
    });
}
