import React from "react";
import { useStaticQuery, graphql } from 'gatsby';

import Col from '../components/content/Col';
import DateTimeUtils from '../utils/datetime';
import Layout from "../components/layout/layout";
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Row from '../components/content/Row';
import SEO from "../components/seo";
import Section from '../components/content/Section';
import SectionTitle from '../components/content/SectionTitle';
import Skills from '../components/content/Skills';
import SkillsItem from '../components/content/SkillsItem';
import Spacer from '../components/content/Spacer';
import Timeline from '../components/content/Timeline';
import TimelineItem from '../components/content/TimelineItem';
import ResumeDownloadButton from "../components/content/ResumeDownloadButton";

const SecondPage = () => {
  const data = useStaticQuery(graphql`
    query ResumeQuery {
      file(name: {eq: "resume"}, sourceInstanceName: {eq: "data"}) {
        childDataJson {
          basics {
            resumeUrl
            yearsOfExperience
          }
          education {
            area
            courses
            description
            endDate
            gpa
            institution
            startDate
            studyType
            summary
          }
          work {
            company
            endDate
            highlights
            position
            startDate
            summary
            website
          }
          skills {
            skillDetails {
              level
              name
            }
            title
          }
        }
      }
    }
  `);

  const { basics, education, skills, work } = data.file.childDataJson;

  return (
    <Layout>
      <SEO title="CV" />

      <Page>
        <Section>
          <PageTitle title="Mon CV" description={`${basics.yearsOfExperience} ans d'expérience`} />

          <Row spacing={5}>
            <Col xs={12} sm={8}>
              <SectionTitle title="Formation" />

              <Timeline>
                {education.map((educationItem, educationIndex) => (
                  <TimelineItem
                    key={educationIndex}
                    period={`${DateTimeUtils.getDisplayFromDate(educationItem.startDate)} - ${DateTimeUtils.getDisplayFromDate(educationItem.endDate)}`}
                    company={educationItem.institution}
                    title={educationItem.summary}
                    description={educationItem.description}
                  />
                ))}
              </Timeline>

              <Spacer />

              <SectionTitle title="Expérience" />

              <Timeline>
                {work.map((workItem, workIndex) => (
                  <TimelineItem
                    key={workIndex}
                    period={`${DateTimeUtils.getDisplayFromDate(workItem.startDate)} - ${DateTimeUtils.getDisplayFromDate(workItem.endDate)}`}
                    company={workItem.company}
                    title={`${workItem.position} • ${workItem.summary}`}
                    description={workItem.highlights}
                    website={workItem.website}
                  />
                ))}
              </Timeline>
            </Col>

            <Col xs={12} sm={4}>
              <SectionTitle title="Compétences" />

              {skills.map((skillsGroup, skillsGroupIndex) => (
                <Skills title={skillsGroup.title} key={skillsGroupIndex}>
                  {skillsGroup.skillDetails.map((skill, skillIndex) => (
                    <SkillsItem key={skillIndex} title={skill.name} value={skill.level} />
                  ))}

                </Skills>
              ))}
            </Col>
          </Row>

          <Spacer />

          <Row>
            <Col>
              <ResumeDownloadButton url={basics.resumeUrl} />
            </Col>
          </Row>
        </Section>
      </Page>
    </Layout>
  );
}

export default SecondPage
