import React from "react";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import Header from "../../header/Header";
import DashboardGraphs from "../../admin/dashboardGraphs/DashboardGraphs";

const StatsLayoutView = () => (
  <AppLayout>
    <Header title={<FormattedMessage id="stats.title" />} />
    <DashboardGraphs />
  </AppLayout>
);

export default StatsLayoutView;
