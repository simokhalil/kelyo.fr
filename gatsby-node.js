const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {fields: {collection: {eq: "posts"}}}
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
            }
          }
        }
      }

      categories: allMarkdownRemark {
        distinct(field: frontmatter___categories)
      }
    }
  `);

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  if (!pages.data) {
    return;
  }

  pages.data.posts.edges.forEach(({ node }) => {

    const nodeDate = new Date(node.frontmatter.date);
    const year = nodeDate.getFullYear();
    const month = `0${nodeDate.getMonth() + 1}`.slice(-2);

    createPage({
      path: `blog/${year}/${month}/${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        uid: node.fields.slug,
      },
    });
  });

  // Blog categories
  /*pages.data.categories.distinct.map(({ category }) => {
    createPage({
      path: `blog/categories/${category}`,
      component: blogPostTemplate,
      context: {
        uid: node.frontmatter.path,
      },
    })
  });*/
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {

    // Get the parent node
    const parent = getNode(_.get(node, 'parent'))

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, 'sourceInstanceName'),
    });

    // Get node's slug
    const slug = createFilePath({ node, getNode });

    // Create a field with slug value
    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/\//g, ''),
    });
  }
}
