const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {fields: {collection: {eq: "posts"}}}
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
              year
              month
              day
              date
            }
            frontmatter {
              date
            }
          }
        }
      }
    }
  `);

  const categoriesReq = await graphql(`
    {
      allMarkdownRemark(filter: {fields: {collection: {eq: "categories"}}}) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const tagsReq = await graphql(`
    {
      allMarkdownRemark(filter: {fields: {collection: {eq: "tags"}}}) {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);
  const blogListTemplate = path.resolve("./src/templates/blogListTemplate.js");
  const blogCategoriesTemplate = path.resolve("./src/templates/blogCategoriesTemplate.js");
  const blogTagsTemplate = path.resolve("./src/templates/blogTagsTemplate.js");

  if (!pages.data) {
    return;
  }

  // Blog posts pages
  pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        uid: node.fields.slug,
      },
    });
  });

  // Blog list pages (pagination)
  const posts = pages.data.allMarkdownRemark.edges;
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  })

  // Blog categories
  const categories = categoriesReq.data.allMarkdownRemark.edges;

  categories.map((category) => {
    createPage({
      path: `blog/categories/${category.node.frontmatter.title}`,
      component: blogCategoriesTemplate,
      context: {
        category: category.node.frontmatter.title,
        limit: 1000,
        skip: 0,
        numPages: 1,
        currentPage: 1,
      },
    });
  });

  // Blog tags
  const tags = tagsReq.data.allMarkdownRemark.edges;

  tags.map((tag) => {
    createPage({
      path: `blog/tags/${tag.node.frontmatter.title}`,
      component: blogTagsTemplate,
      context: {
        tag: tag.node.frontmatter.title,
        limit: 1000,
        skip: 0,
        numPages: 1,
        currentPage: 1,
      },
    });
  });
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

    if (_.get(parent, 'sourceInstanceName') === 'posts') {
      // Get node's slug
      const slug = createFilePath({ node, getNode });

      console.log('slug', slug);

      // Create a field with slug value
      createNodeField({
        node,
        name: 'slug',
        value: slug.replace(/\//g, ''),
      });

      const date = node.frontmatter.date;

      console.log('date', date);

      const nodeDate = new Date(date);
      const month = `0${nodeDate.getMonth() + 1}`.slice(-2);

      createNodeField({
        node,
        name: 'date',
        value: nodeDate.toISOString(),
      });
      createNodeField({
        node,
        name: 'year',
        value: nodeDate.getFullYear(),
      });
      createNodeField({
        node,
        name: 'month',
        value: month,
      });
      createNodeField({
        node,
        name: 'day',
        value: nodeDate.getDate(),
      });
    }
  }
}
