import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Col from '../components/content/Col';
import Layout from "../components/layout/layout";
import InfoBlockWithIcon from '../components/content/InfoBlockWithIcon';
import Page from '../components/content/Page';
import ResumeDownloadButton from "../components/content/ResumeDownloadButton";
import Row from '../components/content/Row';
import SEO from "../components/seo";
import Section from '../components/content/Section';
import SectionTitle from '../components/content/SectionTitle';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(name: {eq: "resume"}, sourceInstanceName: {eq: "data"}) {
        childDataJson {
          basics {
            label
            name
            resumeUrl
            summary
            services {
              description
              icon
              fontawesome
              title
            }
          }
        }
      }
    }
  `);

  const { basics } = data.file.childDataJson;

  return (
    <Layout>
      <SEO title="Home" />

      <Page>
        <Section fullWidth>
          <div className="start-page-full-width">
            <Row>
              <Col item xs={12} md={6} lg={6}>
                <div className="full-block" />
              </Col>

              <Col item xs={12} md={6}>
                <div className="hp-text-block">
                  <h2 style={{ color: '#888', fontSize: '14px', fontWeight: '300' }}>{basics.label}</h2>
                  <h1 style={{ fontSize: '48px', lineHeight: '1.2em', marginBottom: '15px', fontWeight: '600' }}>{basics.name}</h1>

                  {basics.summary.map((line, index) => (
                    <p key={index}>{line}</p>
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
              <SectionTitle title="Ce que je vous propose" />

              <Row>
                {basics.services.map((services, index) => (
                  <Col xs={12} sm={6} key={index}>
                    {services.map((service, serviceIndex) => (
                      <InfoBlockWithIcon
                        key={serviceIndex}
                        fontawesome={service.fontawesome}
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
              <SectionTitle title="Technologies" />

              <Row>
                <Col xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <i className="devicon-javascript-plain colored" style={{ fontSize: '54px' }}></i>
                  <i className="devicon-typescript-plain colored" style={{ fontSize: '54px' }}></i>
                  <i className="devicon-webpack-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-react-original-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-nodejs-plain colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-express-original-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-mongodb-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-angularjs-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-git-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-bootstrap-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-html5-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-css3-plain-wordmark colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-sass-original colored" style={{ fontSize: '54px' }} />
                  <i className="devicon-docker-plain-wordmark colored" style={{ fontSize: '54px' }} />

                </Col>
              </Row>
            </Col>
          </Row>
        </Section>

      </Page>
    </Layout>
  )
}

export default IndexPage
