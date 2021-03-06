import React, { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import ErrorResultView from "./errorResultView";

const ErrorProfileHidden = () => {
  const [back, setBack] = useState(false);
  const [profile, setProfile] = useState(false);
  const { id } = useSelector((state) => state.user);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  if (profile) {
    return <Redirect to={`/profile/${id}`} />;
  }

  return (
    <ErrorResultView
      resultProps={{
        status: "404",
        title: <FormattedMessage id="profile.hidden" />,
        subTitle: <FormattedMessage id="profile.hidden.description" />,
        extra: (
          <>
            <Button onClick={handleClick} type="primary">
              <HomeOutlined style={{ marginRight: 10 }} />
              <FormattedMessage id="error.button" />
            </Button>
            <Button onClick={() => setProfile(true)}>
              <UserOutlined style={{ marginRight: 10 }} />
              <FormattedMessage id="setup.done.view.profile" />
            </Button>
          </>
        ),
      }}
    />
  );
};

export default ErrorProfileHidden;
