import React from "react";
import {
  EyeInvisibleFilled,
  RiseOutlined,
  SolutionOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import PropTypes from "prop-types";
import { Card, Row, Col, Statistic } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { IntlPropType } from "../../../utils/customPropTypes";

/**
 *  StatCardsView(props)
 *  This component renders the statistic cards for the Admin Dashboard page.
 */
const StatCardsView = ({
  countUsers,
  countHiddenUsers,
  countInactiveUsers,
  countExFeederUsers,
  newUsers,
  growthRatePrevMonth,
  intl,
}) => {
  return (
    <Row gutter={[8, 8]} type="flex">
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={countUsers === "-"}>
          <Statistic
            title={<FormattedMessage id="admin.dashboard.total.users" />}
            value={countUsers}
            valueStyle={{ color: "#3f8600" }}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={countInactiveUsers === "-"}>
          <Statistic
            title={<FormattedMessage id="admin.dashboard.inactive.users" />}
            value={countInactiveUsers}
            valueStyle={{ color: "#515052" }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={countHiddenUsers === "-"}>
          <Statistic
            title={<FormattedMessage id="admin.dashboard.flagged.profiles" />}
            value={countHiddenUsers}
            valueStyle={{ color: "#cf1322" }}
            prefix={<EyeInvisibleFilled />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={countExFeederUsers === "-"}>
          <Statistic
            title={<FormattedMessage id="admin.dashboard.ex.feeders" />}
            value={countExFeederUsers}
            valueStyle={{ color: "#82A7A6" }}
            prefix={<SolutionOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={newUsers === "-"}>
          <Statistic
            title={`${intl.formatMessage({
              id: "admin.dashboard.monthly.added",
            })} - ${moment().format("MMMM")}`}
            value={newUsers}
            valueStyle={{ color: "#CD8FD6" }}
            prefix={<UsergroupAddOutlined />}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "100%" }} loading={growthRatePrevMonth === "-"}>
          <Statistic
            title={`${intl.formatMessage({
              id: "admin.dashboard.growth.rate.percentage",
            })} - ${moment().format("MMMM")}`}
            value={growthRatePrevMonth}
            valueStyle={{ color: "#FF934F" }}
            prefix={<RiseOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};

StatCardsView.propTypes = {
  countUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countHiddenUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countInactiveUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  countExFeederUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  newUsers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  growthRatePrevMonth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  intl: IntlPropType,
};

StatCardsView.defaultProps = {
  countUsers: "-",
  countHiddenUsers: "-",
  countInactiveUsers: "-",
  countExFeederUsers: "-",
  newUsers: "-",
  growthRatePrevMonth: "-",
  intl: undefined,
};

export default injectIntl(StatCardsView);
