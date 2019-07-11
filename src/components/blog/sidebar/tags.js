import React from 'react';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

const TagsList = () => {
  const data = useStaticQuery(graphql`
    query TagsListQuery {
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

  const tags = data.allMarkdownRemark.edges;

  return (
    <div>
      <h3>Tags</h3>

      <ul>
        {tags.map((tag, index) => (
          <li key={index}><Link to={`/blog/tags/${tag.node.frontmatter.title}`} rel={tag.node.frontmatter.title}>{tag.node.frontmatter.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default TagsList;
