import BackgroundImage from 'gatsby-background-image';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core';

import Col from '../components/common/Col';
import InfoBlockWithIcon from '../components/content/InfoBlockWithIcon';
import Page from '../components/common/Page';
import ResumeDownloadButton from '../components/content/ResumeDownloadButton';
import Row from '../components/common/Row';
import SEO from '../components/seo';
import Section from '../components/common/Section';
import SectionTitle from '../components/common/SectionTitle';
import TechnologiesSection from '../components/content/TechnologiesSection';

const useStyles = makeStyles({
  h1: {
    fontSize: isMobile ? '36px' : '48px',
    lineHeight: '1.2em',
    marginBottom: '15px',
    fontWeight: '600',
  },
  h2: {
    color: '#666',
    fontSize: '14px',
    fontWeight: '400',
  },
  text: {
    textAlign: 'justify',
  },
});

const IndexPage = ({ t }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      profile: file(
        name: { eq: "resume" }
        sourceInstanceName: { eq: "data" }
      ) {
        childDataJson {
          basics {
            label
            name
            resumeUrl
            summary
            services {
              description
              icon
              title
            }
          }
        }
      }
      profileImage: file(relativePath: { eq: "profile_lg.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  const classes = useStyles();

  const { basics } = data.profile.childDataJson;
  const imageData = data.profileImage.childImageSharp.fluid;

  const devIconColoredClass = 'colored';

  return (
    <>
      <SEO title="Kelyo" />

      <Page>
        <Section fullWidth>
          <div className="start-page-full-width">
            <Row>
              <Col item xs={12} md={6} lg={6}>
                <BackgroundImage
                  Tag="div"
                  className="full-block"
                  fluid={imageData}
                />
              </Col>

              <Col item xs={12} md={6}>
                <div className="hp-text-block">
                  <h2 className={classes.h2}>{basics.label}</h2>
                  <h1 className={classes.h1}>{basics.name}</h1>

                  {basics.summary.map((line, index) => (
                    <p key={index} className={classes.text}>
                      {line}
                    </p>
                  ))}

                  <ResumeDownloadButton url={basics.resumeUrl} />
                </div>
              </Col>
            </Row>
          </div>
        </Section>

        <Section>
          <Row>
            <Col xs={12} sm={12}>
              <SectionTitle title={t('pages.home.servicesTitle')} />

              <Row spacing={5}>
                {basics.services.map((services, index) => (
                  <Col xs={12} sm={6} key={index}>
                    {services.map((service, serviceIndex) => (
                      <InfoBlockWithIcon
                        key={serviceIndex}
                        icon={service.icon}
                        title={service.title}
                        text={service.description}
                      />
                    ))}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12}>
              <SectionTitle title={t('pages.home.technologiesTitle')} />

              <TechnologiesSection colored />
            </Col>
          </Row>
        </Section>
      </Page>
    </>
  );
};

export default translate()(IndexPage);
