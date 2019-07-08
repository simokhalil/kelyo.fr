const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
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

  console.log('pages', JSON.stringify(pages.data));

  if (!pages.data) {
    return;
  }

  pages.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.frontmatter.path}`,
      component: blogPostTemplate,
      context: {
        uid: node.frontmatter.path,
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
