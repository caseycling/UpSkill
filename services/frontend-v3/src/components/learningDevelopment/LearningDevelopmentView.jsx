import React from "react";
import { List, Tag, Row, Empty, Col } from "antd";
import { FormattedMessage } from "react-intl";
import { PropTypes } from "prop-types";

const LearningDevelopmentView = ({ devGoals }) => {
  const dataSource = [
    {
      title: <FormattedMessage id="profile.developmental.goals" />,
      render: (
        <>
          {devGoals.length > 0 ? (
            <div style={{ marginTop: 7 }}>
              {Object.values(devGoals).map(({ name, id }) => (
                <Tag color="#00605e" key={id}>
                  {name}
                </Tag>
              ))}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <FormattedMessage id="profile.developmental.goals.empty" />
              }
            />
          )}
        </>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={({ title, render }) => (
            <List.Item>
              <Col span={24}>
                <List.Item.Meta title={title} />
                {render}
              </Col>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

LearningDevelopmentView.propTypes = {
  devGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

LearningDevelopmentView.defaultProps = {
  devGoals: [],
};

export default LearningDevelopmentView;
