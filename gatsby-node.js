const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const pages = await graphql(`
        {
            allMarkdownRemark(
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
        }
    `);

    const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

    pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `blog/${node.frontmatter.path}`,
            component: blogPostTemplate,
            context: {
                uid: node.frontmatter.path,
            },
        })
    });

    /* return graphql(`
    {
      allMarkdownRemark(
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
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

      return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: `blog/${node.frontmatter.path}`,
                component: blogPostTemplate,
                context: {
                    uid: node.frontmatter.path,
                },
            })
        })
    }*/
}
