import React from "react";
import { Tree } from "antd";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const OrgTreeView = ({ data }) => {
  const { locale } = useSelector((state) => state.settings);

  const treeData = [];

  const titleString = (title) => {
    if (typeof title === "object") {
      return title[locale];
    }
    return title;
  };

  const genTreeBranch = (orgData) => {
    let retVal = [];
    const branchSize = orgData.length;
    for (let i = 0; i < branchSize; i += 1) {
      const val = orgData[branchSize - i - 1];
      const object = {
        title: titleString(val.title),
        key: val.id,
      };
      if (retVal.length !== 0) {
        object.children = [retVal];
      }
      retVal = object;
    }
    return retVal;
  };

  data.organizations.forEach((org) => {
    treeData.push(genTreeBranch(org));
  });

  return (
    <Tree
      defaultExpandAll
      defaultExpandParent
      treeData={treeData}
      selectable={false}
    />
  );
};

OrgTreeView.propTypes = {
  data: PropTypes.shape({
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        key: PropTypes.string,
        tier: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default OrgTreeView;
