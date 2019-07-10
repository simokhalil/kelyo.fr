import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const CategoriesList = () => {
  const data = useStaticQuery(graphql`
    query CategoriesListQuery {
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

  const categories = data.allMarkdownRemark.edges;

  return (
    <div>
      <h3>Catégories</h3>

      <ul>
        {categories.map((category, index) => (
          <li key={index}><a href={`/blog/categories/${category.node.frontmatter.title}`}>{category.node.frontmatter.title}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
