import React from 'react';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import Col from '../components/common/Col';
import DateTimeUtils from '../utils/datetime';
import Page from '../components/common/Page';
import PageTitle from '../components/common/PageTitle';
import Row from '../components/common/Row';
import SEO from '../components/seo';
import Section from '../components/common/Section';
import SectionTitle from '../components/common/SectionTitle';
import Skills from '../components/content/Skills';
import SkillsItem from '../components/content/SkillsItem';
import Spacer from '../components/common/Spacer';
import Timeline from '../components/content/Timeline';
import TimelineItem from '../components/content/TimelineItem';
import ResumeDownloadButton from '../components/content/ResumeDownloadButton';

const SecondPage = ({ t }) => {
  const data = useStaticQuery(graphql`
    query ResumeQuery {
      file(name: { eq: "resume" }, sourceInstanceName: { eq: "data" }) {
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
    <>
      <SEO title={t('pages.resume.title')} />

      <Page>
        <Section>
          <PageTitle
            title={t('pages.resume.title')}
            description={t('pages.resume.yearsOfExprerience', {
              smart_count: basics.yearsOfExperience,
            })}
            pathname="/resume/"
          />

          <Row spacing={5}>
            <Col xs={12} sm={8}>
              <SectionTitle title={t('pages.resume.education')} />

              <Timeline>
                {education.map((educationItem, educationIndex) => (
                  <TimelineItem
                    key={educationIndex}
                    period={`${DateTimeUtils.getDisplayFromDate(
                      educationItem.startDate
                    )} - ${DateTimeUtils.getDisplayFromDate(
                      educationItem.endDate
                    )}`}
                    company={educationItem.institution}
                    title={educationItem.summary}
                    description={educationItem.description}
                  />
                ))}
              </Timeline>

              <Spacer />

              <SectionTitle title={t('pages.resume.experience')} />

              <Timeline>
                {work.map((workItem, workIndex) => (
                  <TimelineItem
                    key={workIndex}
                    period={`${DateTimeUtils.getDisplayFromDate(
                      workItem.startDate
                    )} - ${DateTimeUtils.getDisplayFromDate(workItem.endDate)}`}
                    company={workItem.company}
                    title={`${workItem.position} • ${workItem.summary}`}
                    description={workItem.highlights}
                    website={workItem.website}
                  />
                ))}
              </Timeline>
            </Col>

            <Col xs={12} sm={4}>
              <SectionTitle title={t('pages.resume.skills')} />

              {skills.map((skillsGroup, skillsGroupIndex) => (
                <Skills title={skillsGroup.title} key={skillsGroupIndex}>
                  {skillsGroup.skillDetails.map((skill, skillIndex) => (
                    <SkillsItem
                      key={skillIndex}
                      title={skill.name}
                      value={skill.level}
                    />
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
    </>
  );
};

export default translate()(SecondPage);
