import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { PageHeader, Anchor } from "antd";
import AppLayout from "../appLayout/AppLayout";

import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
import Competencies from "../../competenciesCard/Competencies";
import DevelopmentalGoals from "../../developmentalGoals/DevelopmentalGoals";
import TalentManagement from "../../talentManagement/TalentManagement";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Projects from "../../projects/Projects";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";

import { Row, Col, Divider } from "antd";
const { Link } = Anchor;

function ProfileLayoutView(props) {
  const displayAllProfileCards = () => {
    const { data } = props;
    return (
      <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col xs={24} xl={14}>
            <BasicInfo data={data} style={styles.card} />
          </Col>
          <Col xs={24} xl={10}>
            <EmployeeSummary data={data} />
          </Col>
        </Row>

        <Divider orientation="left" id="divider-skills-and-comp">
          {<FormattedMessage id="profile.employee.skills.competencies" />}
        </Divider>
        <Row style={styles.row}>
          <Col span={24}>
            <Skills data={data}></Skills>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Competencies data={data}></Competencies>
          </Col>
        </Row>
        <Divider orientation="left" id="divider-employee-growth">
          {<FormattedMessage id="profile.employee.growth.interests" />}
        </Divider>
        <Row style={styles.row}>
          <Col span={24}>
            <DevelopmentalGoals data={data}></DevelopmentalGoals>
          </Col>
        </Row>
        <Row
          style={styles.row}
          gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
          type="flex"
        >
          <Col xs={24} xl={12}>
            <TalentManagement data={data} />
          </Col>
          <Col xs={24} xl={12}>
            <CareerInterests data={data} />
          </Col>
        </Row>

        <Divider orientation="left" id="divider-qualifications">
          {<FormattedMessage id="profile.employee.qualifications" />}
        </Divider>

        <Row style={styles.row}>
          <Col span={24}>
            <Education data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Experience data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Projects data={data} />
          </Col>
        </Row>
      </div>
    );
  };

  const sider = () => {
    return (
      <Row justify="center">
        <Col flex={1} offset={1}>
          <Anchor>
            <Link
              href="#card-profile-basic-info"
              title={props.intl.formatMessage({
                id: "profile.basic"
              })}
            />
            <Link
              href="#card-profile-employee-summary"
              title={props.intl.formatMessage({
                id: "profile.employee.summary"
              })}
            />
            <Link
              href="#divider-skills-and-comp"
              title={props.intl.formatMessage({
                id: "profile.employee.skills.competencies"
              })}
            >
              <Link
                href="#card-profile-skills"
                title={props.intl.formatMessage({
                  id: "profile.skills"
                })}
              />
              <Link
                href="#card-profile-competency"
                title={props.intl.formatMessage({
                  id: "profile.competencies"
                })}
              />
            </Link>
            <Link
              href="#divider-employee-growth"
              title={props.intl.formatMessage({
                id: "profile.employee.growth.interests"
              })}
            >
              <Link
                href="#card-profile-dev-goals"
                title={props.intl.formatMessage({
                  id: "profile.developmental.goals"
                })}
              />
              <Link
                href="#card-profile-talent-management"
                title={props.intl.formatMessage({
                  id: "profile.talent.management"
                })}
              />
              <Link
                href="#card-profile-career-interests"
                title={props.intl.formatMessage({
                  id: "profile.career.interests"
                })}
              />
            </Link>
            <Link
              href="#divider-qualifications"
              title={props.intl.formatMessage({
                id: "profile.employee.qualifications"
              })}
            >
              <Link
                href="#card-profile-education"
                title={props.intl.formatMessage({
                  id: "profile.education"
                })}
              />
              <Link
                href="#card-profile-experience"
                title={props.intl.formatMessage({
                  id: "profile.experience"
                })}
              />
              <Link
                href="#card-profile-projects"
                title={props.intl.formatMessage({
                  id: "profile.projects"
                })}
              />
            </Link>
          </Anchor>
        </Col>
      </Row>
    );
  };

  const styles = {
    card: {
      height: "100%"
    },
    row: {
      marginTop: 15
    }
  };

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={true}
      sideBarContent={sider()}
    >
      <PageHeader
        style={{
          padding: "0 0 15px 7px"
        }}
        title="User Profile"
      />
      {displayAllProfileCards()}
    </AppLayout>
  );
}

/* Component Styles */

//Needed when using props.intl
export default injectIntl(ProfileLayoutView);