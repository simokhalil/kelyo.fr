import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const CategoriesList = () => {
  const data = useStaticQuery(graphql`
    query CategoriesListQuery {
      allMarkdownRemark {
        distinct(field: frontmatter___categories)
      }
    }
  `);

  const categories = data.allMarkdownRemark.distinct;

  return (
    <ul>
      {categories.map((category, index) => (
        <li key={index}><a href={`/blog/categories/${category}`}>{category}</a></li>
      ))}
    </ul>
  );
}

export default CategoriesList;
