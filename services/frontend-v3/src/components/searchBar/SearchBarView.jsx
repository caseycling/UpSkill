import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  Switch,
  Select,
  Divider,
  Checkbox,
  TreeSelect,
} from "antd";
import {
  SearchOutlined,
  SettingOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import logo from "../../assets/I-talent-logo.png";
import { IntlPropType } from "../../utils/customPropTypes";
import filterOption from "../../functions/filterSelectInput";

const { SHOW_CHILD } = TreeSelect;
const { Option } = Select;
const { Title } = Typography;

const SearchBarView = ({
  anyMentorSkills,
  intl,
  locationOptions,
  skillOptions,
  classOptions,
  branchOptions,
  handleSearch,
  handleAnyMentorSkillsChange,
}) => {
  const [expandAdvancedSearch, setExpandAdvancedSearch] = useState(false);
  const [form] = Form.useForm();

  const styles = {
    outerForm: {
      width: "100%",
      paddingTop: "80px",
    },
    outerDiv: {
      width: "90%",
      maxWidth: "1100px",
      margin: "auto",
    },
    mainSearchDiv: {
      backgroundColor: "rgb(25, 46, 47)",
      borderRadius: "5px 5px 0 0",
      padding: "50px 80px 40px 80px",
      boxShadow: "10px 10px 10px #cccccc",
      textAlign: "center",
    },
    mainSearchField: {
      margin: "30px 10px 10px 10px",
    },
    submitBtn: {
      marginLeft: 8,
      width: "100%",
      maxWidth: "200px",
      marginTop: "10px",
    },
    clearBtn: {
      marginLeft: 8,
      marginTop: "10px",
    },
    advFieldStyles: {
      textAlign: "center",
      marginTop: "10px",
    },
    advSearchCard: {
      padding: "15px",
      backgroundColor: "#fff",
      boxShadow: "10px 10px 10px #cccccc",
      borderRadius: "0 0 5px 5px",
    },
    advFieldPlacement: {
      textAlign: "center",
    },
    alert: {
      fontSize: "14px",
      textAlign: "center",
      margin: "0 auto",
      width: "300px",
    },
  };

  const searchLabel = intl.formatMessage({
    id: "button.search",
  });

  // Toggle expandable advanced search form
  const toggle = () => {
    setExpandAdvancedSearch(!expandAdvancedSearch);
  };

  // Handle form submission
  const onFinish = (values) => {
    handleSearch(values);
  };

  // Generate the basic input field for basic search
  const getBasicField = () => {
    return (
      <Form.Item style={{ width: "100%" }} label="" name="searchValue">
        <Input placeholder={searchLabel} size="large" />
      </Form.Item>
    );
  };

  // Generate the regular search fields
  const getBasicSearchForm = (displayForm) => {
    if (!displayForm) {
      return null;
    }

    return (
      <div>
        <div style={styles.mainSearchField}>{getBasicField()}</div>
        <Button
          shape="round"
          size="large"
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
          style={styles.submitBtn}
        >
          {searchLabel}
        </Button>
        <Button
          ghost
          shape="round"
          size="large"
          style={styles.clearBtn}
          onClick={() => {
            form.resetFields();
          }}
        >
          <FormattedMessage id="button.clear" />
        </Button>
      </div>
    );
  };

  // Generate the advanced search fields
  const getAdvancedSearchForm = (displayForm) => {
    if (!displayForm) {
      return null;
    }
    return (
      <div style={{ marginBottom: "0" }}>
        <Row style={{ padding: "20px 5% 0px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={2} style={{ fontSize: "1.3em" }}>
              <SettingOutlined
                style={{ marginRight: "4px", color: "#3CBAB3" }}
              />
              <FormattedMessage id="advanced.search.button.text" />
            </Title>
            <FormattedMessage id="advanced.search.description" />
          </Col>
        </Row>

        <Row style={{ padding: "15px 5% 0px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              <FormattedMessage id="search.advanced.general.title" />
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[48, 24]}
          style={{ padding: "0px 5%", marginBottom: "0px" }}
        >
          {/* form column one */}
          <Col span={12}>
            {/* name field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.name" />}
              name="name"
            >
              <Input style={{ width: "100%" }} placeholder={searchLabel} />
            </Form.Item>

            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="advanced.search.form.classification" />
              }
              name="classifications"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                maxTagCount={3}
                placeholder={searchLabel}
                filterOption={filterOption}
              >
                {classOptions.map((value) => {
                  return <Option key={value.id}>{value.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>

          {/* form column three */}
          <Col span={12}>
            {/* Location field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.location" />}
              name="locations"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
                filterOption={filterOption}
              >
                {locationOptions.map((value) => {
                  return (
                    <Option key={value.id}>
                      {value.streetNumber} {value.streetName}, {value.city},{" "}
                      {value.province}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* branch field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.branch" />}
              name="branches"
            >
              <Select
                style={{ width: "100%" }}
                mode="multiple"
                placeholder={searchLabel}
                maxTagCount={3}
                filterOption={filterOption}
              >
                {branchOptions.map((value) => {
                  return <Option key={value}>{value}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ padding: "5px 5% 5px 5%" }}>
          <Col span={24} style={{ padding: "0px 0" }}>
            <Title level={3} style={{ fontSize: "1em" }}>
              <FormattedMessage id="search.advanced.skill.title" />
            </Title>
          </Col>
        </Row>
        <Row
          gutter={[48, 24]}
          style={{ padding: "0px 5%", marginBottom: "0px" }}
        >
          {/* form column one */}
          <Col span={24}>
            {/* Skills field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.skills" />}
              name="skills"
            >
              <TreeSelect
                className="custom-bubble-select-style"
                treeData={skillOptions}
                treeCheckable
                showCheckedStrategy={SHOW_CHILD}
                placeholder={<FormattedMessage id="setup.select" />}
                treeNodeFilterProp="title"
                showSearch
                maxTagCount={15}
              />
            </Form.Item>
            {/* classification field */}
            <Form.Item
              label={
                <FormattedMessage id="advanced.search.form.mentorship.skills" />
              }
              name="mentorSkills"
            >
              <TreeSelect
                className="custom-bubble-select-style"
                treeData={skillOptions}
                treeCheckable
                showCheckedStrategy={SHOW_CHILD}
                placeholder={<FormattedMessage id="setup.select" />}
                treeNodeFilterProp="title"
                showSearch
                maxTagCount={15}
                disabled={anyMentorSkills}
              />
            </Form.Item>
            <Form.Item name="anyMentorSkills" valuePropName="checked">
              <Checkbox onChange={handleAnyMentorSkillsChange}>
                <FormattedMessage id="select.any.mentors" />
              </Checkbox>
            </Form.Item>
            {/* exFeeder field */}
            <Form.Item
              label={<FormattedMessage id="advanced.search.form.ex.feeder" />}
              name="exFeeder"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "-40px 0 30px 0",
          }}
        >
          <Button
            shape="round"
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            style={styles.submitBtn}
          >
            {searchLabel}
          </Button>
          <Button
            shape="round"
            size="large"
            style={styles.clearBtn}
            onClick={() => {
              form.resetFields();
            }}
          >
            <FormattedMessage id="button.clear" />
          </Button>
        </div>
        <Divider />
      </div>
    );
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={styles.outerForm}
      layout="vertical"
    >
      <div style={styles.outerDiv}>
        <div style={styles.mainSearchDiv}>
          <img
            src={logo}
            alt="I-Talent Logo"
            style={{ width: "80%", maxWidth: "370px" }}
          />
          {/* Gets main basic search field and shows buttons beneath */}
          {getBasicSearchForm(!expandAdvancedSearch)}
        </div>
        <div style={styles.advSearchCard}>
          {/* Gets fields for Advanced Search in collapse */}
          {getAdvancedSearchForm(expandAdvancedSearch)}
          {/* expand advance search btn */}
          <Row>
            <Col span={24} style={styles.advFieldPlacement}>
              <Button
                type="link"
                onClick={toggle}
                style={{ fontSize: 15 }}
                tabIndex="0"
                size="small"
              >
                {/* <SettingOutlined style={{ marginRight: "3px" }} /> */}
                {expandAdvancedSearch ? (
                  <div>
                    <DoubleRightOutlined
                      rotate="270"
                      style={{ marginRight: "4px" }}
                    />
                    <FormattedMessage id="button.basic.search" />
                  </div>
                ) : (
                  <div>
                    <DoubleRightOutlined
                      rotate="90"
                      style={{ marginRight: "4px" }}
                    />
                    <FormattedMessage id="button.advanced.search" />
                  </div>
                )}
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  );
};

SearchBarView.propTypes = {
  branchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  locationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      streetName: PropTypes.string,
      streetNumber: PropTypes.number,
    })
  ).isRequired,
  skillOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  intl: IntlPropType,
  anyMentorSkills: PropTypes.bool.isRequired,
  handleAnyMentorSkillsChange: PropTypes.func.isRequired,
};

SearchBarView.defaultProps = {
  intl: undefined,
};

export default injectIntl(SearchBarView);
