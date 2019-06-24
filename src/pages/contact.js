import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Col from '../components/content/Col';
import ContactForm from '../components/content/ContactForm';
import InfoBlockRaise from '../components/content/InfoBlockRaise';
import Layout from "../components/layout/layout";
import Map from '../components/map/Map';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';
import SectionTitle from '../components/content/SectionTitle';

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query ConstactQuery {
      file(name: {eq: "resume"}, sourceInstanceName: {eq: "data"}) {
        childDataJson {
          basics {
            email
            location {
              city
            }
            phone
            website
          }
        }
      }
    }
  `);

  const { basics } = data.file.childDataJson;

  return (
    <Layout>
      <SEO title="Contact" />

      <Page>
        <Section>
          <PageTitle title="Contact" description="Restons en contact" />

          <Row>
            <Col xs={12}>
              <Map
                center={{ lat: 47.218371, lng: -1.553621 }}
              />
            </Col>
          </Row>

          <Row spacing={5}>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                fontawesome
                icon="fas fa-phone"
                label={basics.phone}
              />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                fontawesome
                icon="fas fa-map-marker-alt"
                label={basics.location.city}
              />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                fontawesome
                icon="far fa-envelope"
                label={basics.email}
              />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                fontawesome
                icon="far fa-check-circle"
                label="Dispo en freelance"
              />
            </Col>
          </Row>

          <Section>
            <Row>
              <Col xs={12} sm={2}></Col>
              <Col xs={12} sm={8}>
                <SectionTitle title="Comment je peux vous aider ?" />

                <ContactForm />
              </Col>
              <Col xs={12} sm={2}></Col>
            </Row>
          </Section>
        </Section>
      </Page>
    </Layout>
  );
}

export default ContactPage;
