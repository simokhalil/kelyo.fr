import React from 'react';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import Col from '../components/content/Col';
import ContactForm from '../components/content/ContactForm';
import InfoBlockRaise from '../components/content/InfoBlockRaise';
import Map from '../components/map/Map';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';
import SectionTitle from '../components/content/SectionTitle';

const ContactPage = ({ t }) => {
  const data = useStaticQuery(graphql`
    query ConstactQuery {
      file(name: { eq: "resume" }, sourceInstanceName: { eq: "data" }) {
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
    <>
      <SEO title={t('pages.contact.title')} pathname="/contact/" />

      <Page>
        <Section>
          <PageTitle title={t('pages.contact.title')} description={t('pages.contact.description')} />

          <Row>
            <Col xs={12}>
              <Map center={{ lat: 47.218371, lng: -1.553621 }} />
            </Col>
          </Row>

          <Row spacing={5}>
            <Col xs={12} sm={3}>
              <InfoBlockRaise icon={['fas', 'phone']} label={basics.phone} />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                icon={['fas', 'map-marker-alt']}
                label={basics.location.city}
              />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise icon={['far', 'envelope']} label={basics.email} />
            </Col>
            <Col xs={12} sm={3}>
              <InfoBlockRaise
                icon={['far', 'check-circle']}
                label={t('pages.contact.status')}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={2}></Col>
            <Col xs={12} sm={8} style={{ padding: '50px 0' }}>
              <SectionTitle title={t('pages.contact.formTitle')} />

              <ContactForm />
            </Col>
            <Col xs={12} sm={2}></Col>
          </Row>
        </Section>
      </Page>
    </>
  );
};

export default translate()(ContactPage);
