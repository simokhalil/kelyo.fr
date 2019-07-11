import React from 'react';
import { Link } from 'gatsby';
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
          <li key={index}><Link to={`/blog/categories/${category.node.frontmatter.title}`} rel={category.node.frontmatter.title}>{category.node.frontmatter.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesList;
