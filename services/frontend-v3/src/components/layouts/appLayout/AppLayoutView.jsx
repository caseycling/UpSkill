import React from "react";
import { Layout, Skeleton, Card } from "antd";
import PropTypes from "prop-types";
import TopNav from "./topNav/TopNav";
import Footer from "./footer/Footer";
import SideNav from "./sideNav/SideNav";

const { Content } = Layout;

const AppLayoutView = ({
  sideBarContent,
  displaySideBar,
  children,
  loading,
  displayLogo,
  displaySearch,
}) => {
  const styles = {
    content: {
      padding: "20px 15px",
      margin: 0,
      marginTop: 64,
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <TopNav
        loading={loading}
        displayLogo={displayLogo}
        displaySearch={displaySearch}
      />
      <Layout>
        <SideNav
          sideBarContent={sideBarContent}
          displaySideBar={displaySideBar}
          loading={loading}
        />
        <Layout>
          <Content style={styles.content}>
            {loading ? (
              <Card>
                <Skeleton active />
              </Card>
            ) : (
              children
            )}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

AppLayoutView.propTypes = {
  sideBarContent: PropTypes.node.isRequired,
  displaySideBar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displayLogo: PropTypes.bool.isRequired,
};

export default AppLayoutView;
