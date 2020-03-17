import React from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import StatCards from "../../components/statCards/StatCards";
import DashboardGraphs from "../../components/dashboardGraphs/DashboardGraphs";
import axios from "axios";
import { Typography, Skeleton } from "antd";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

class AdminDashboard extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Admin | UpSkill";

    this.state = { data: null, loading: true };
  }

  componentDidMount() {
    axios
      .get(backendAddress + "api/admin/dashboard/")
      .then(res => this.setState({ data: res.data, loading: false }))
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    const { data, loading } = this.state;
    const locale = this.props.intl.formatMessage({ id: "language.code" });

    if (loading) {
      return (
        <AppLayout>
          <Skeleton active />
        </AppLayout>
      );
    }

    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <Title>Admin Dashboard</Title>
        <StatCards data={data} />
        <DashboardGraphs data={data} locale={locale} />
      </AppLayout>
    );
  }
}

export default injectIntl(AdminDashboard);