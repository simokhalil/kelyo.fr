import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

const BlogCategoriesTagsList = ({ data, type }) => (

  data.map((category, categoryIndex) => (
    <div key={categoryIndex}>
      <h4><Link to={`/blog/${type}/${category.fieldValue}`} >{category.fieldValue}</Link> <span style={{ fontSize: '0.8em' }}>({category.totalCount})</span></h4>

      <ul style={{ listStyle: 'none', fontSize: '1rem', marginBottom: '2rem' }}>
        {category.edges.map((post, postIndex) => (
          <li key={postIndex} style={{ marginBottom: '1.2rem' }}>
            <Link to={`/blog/${post.node.fields.slug}`}>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ marginRight: '10px', color: '#000000' }} />
              {post.node.frontmatter.title} <span style={{ color: '#9eabb3' }}>- {post.node.frontmatter.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ))
);

BlogCategoriesTagsList.defaultProps = {
  data: [],
  type: 'categories',
};

export default BlogCategoriesTagsList;
