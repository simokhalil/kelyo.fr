import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useStaticQuery, graphql } from 'gatsby';

import BlogCategoriesTagsList from '../../components/blog/BlogCategoriesTagsList';
import Page from '../../components/common/Page';
import PageTitle from '../../components/common/PageTitle';
import Section from '../../components/common/Section';

const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query TagsPageQuery {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                date(formatString: "Do MMMM YYYY", locale: "fr")
                title
              }
            }
          }
          fieldValue
          totalCount
        }
      }
    }
  `);

  const [search, setSearch] = React.useState('');

  let dataGroup = [...data.allMarkdownRemark.group];

  if (search && search.length) {
    dataGroup = dataGroup.filter(item => item.fieldValue.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }

  return (
    <Page>
      <Section fullWidth={isMobileOnly}>

        <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 10px' }}>
          <input
            placeholder="Rechercher une catégorie"
            style={{
              height: 'auto',
              padding: '10px 0',
              fontSize: '25px',
              lineHeight: '30px',
              background: '0 0',
              width: '100%',
              border: 'none',
              outline: 0,
              color: '#5d686f',
              fontWeight: '300',
              marginBottom: '30px',
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <BlogCategoriesTagsList data={dataGroup} type="tags" />

        </div>
      </Section>
    </Page>
  );
}

export default TagsPage;
