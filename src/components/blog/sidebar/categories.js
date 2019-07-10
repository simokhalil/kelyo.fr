import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const CategoriesList = () => {
  const data = useStaticQuery(graphql`
    query CategoriesListQuery {
      query MyQuery {
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
    }
  `);

  const categories = data.allFile.edges;

  return (
    <ul>
      {categories.map((category, index) => (
        <li key={index}><a href={`/blog/categories/${category.node.childMarkdownRemark.frontmatter.title}`}>{category.node.childMarkdownRemark.frontmatter.title}</a></li>
      ))}
    </ul>
  );
}

export default CategoriesList;
