import React from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import axios from "axios";
import {
  CheckCircleOutlined,
  LinkOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Typography, Skeleton, Table, Input, Button, Select } from "antd";
import _ from "lodash";
import moment from "moment";
import { injectIntl } from "react-intl";
import Highlighter from "react-highlight-words";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

const { Option } = Select;

class AdminUser extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Admin | UpSkill";

    this.state = {
      type: "user",
      column: null,
      allData: null,
      data: null,
      direction: null,
      statuses: {},
      loading: true,
      activePage: 1,
      searchText: "",
      searchedColumn: "",
      size: "large"
    };
  }

  // Gets all user information
  componentDidMount() {
    axios
      .get(backendAddress + "api/admin/user")
      .then(res =>
        this.setState({
          allData: res.data,
          data: _.sortBy(res.data, ["firstName"]),
          loading: false,
          column: "name",
          direction: "ascending"
        })
      )
      .catch(function(error) {
        console.error(error);
      });
  }

  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={
            this.props.intl.formatMessage({
              id: "admin.search",
              defaultMessage: "Search for"
            }) +
            " " +
            title
          }
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleApply = async () => {
    await axios
      .put(backendAddress + "api/admin/profileStatus", this.state.statuses)
      .then(() => window.location.reload());
  };

  handleDropdownChange = (status, id) => {
    this.setState(({ statuses, allData }) => {
      statuses[id] = status;

      let changedUser = _.remove(allData, user => user.id === id);

      changedUser = changedUser[0];

      if (status === "Active" || status === "Actif") {
        changedUser.flagged = false;
        changedUser.user.inactive = false;
      }

      if (status === "Inactive" || status === "Inactif") {
        changedUser.flagged = false;
        changedUser.user.inactive = true;
      }

      if (status === "Hidden" || status === "Caché") {
        changedUser.flagged = true;
        changedUser.user.inactive = false;
      }

      allData.push(changedUser);

      return { statuses, allData };
    });
  };

  profileStatusValue = (inactive, flagged) => {
    if (inactive)
      return this.props.intl.formatMessage({
        id: "admin.inactive",
        defaultMessage: "Inactive"
      });
    else if (flagged)
      return this.props.intl.formatMessage({
        id: "admin.flagged",
        defaultMessage: "Hidden"
      });
    else
      return this.props.intl.formatMessage({
        id: "admin.active",
        defaultMessage: "Active"
      });
  };

  renderStatusDropdown = (id, inactive, flagged) => {
    return (
      <div>
        <Select
          key={id}
          style={{ width: 120 }}
          onChange={value => this.handleDropdownChange(value, id)}
          value={this.profileStatusValue(inactive, flagged)}
        >
          <Option
            key="active"
            value={this.props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active"
            })}
          </Option>
          <Option
            key="inactive"
            value={this.props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive"
            })}
          </Option>
          <Option
            key="hidden"
            value={this.props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden"
            })}
          </Option>
        </Select>
      </div>
    );
  };

  render() {
    const { data, loading, size, statuses } = this.state;
    if (loading) {
      return (
        <AppLayout>
          <Skeleton active />
        </AppLayout>
      );
    }

    let allUsers = data;

    allUsers.map(function(e) {
      e.fullName = e.user.name;
      e.formatCreatedAt = moment(e.createdAt).format("LLL");
      e.profileLink = "/secured/profile/" + e.id;
      if (e.tenure === null) {
        e.tenureDescriptionEn = "None Specified";
        e.tenureDescriptionFr = "Aucun spécifié";
      } else {
        e.tenureDescriptionEn = e.tenure.descriptionEn;
        e.tenureDescriptionFr = e.tenure.descriptionFr;
      }
    });

    const jobTitleState =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "jobTitleEn"
        : "jobTitleFr";

    const tenureState =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "tenureDescriptionEn"
        : "tenureDescriptionFr";

    const user_table_columns = [
      {
        title: this.props.intl.formatMessage({
          id: "admin.view",
          defaultMessage: "View"
        }),
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon={<LinkOutlined />}
              onClick={() => window.open(record.profileLink)}
            />
          </span>
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.name",
          defaultMessage: "Name"
        }),
        dataIndex: "fullName",
        key: "name",
        sorter: (a, b) => {
          return a.fullName.localeCompare(b.fullName);
        },
        sortDirections: ["descend"],
        ...this.getColumnSearchProps(
          "fullName",
          this.props.intl.formatMessage({
            id: "admin.name",
            defaultMessage: "Name"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.job.title",
          defaultMessage: "Job Title"
        }),
        dataIndex: jobTitleState,
        key: "jobTitle",
        sorter: (a, b) => {
          return a[jobTitleState].localeCompare(b[jobTitleState]);
        },
        ...this.getColumnSearchProps(
          jobTitleState,
          this.props.intl.formatMessage({
            id: "admin.job.title",
            defaultMessage: "Job Title"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.registered",
          defaultMessage: "Registered"
        }),
        dataIndex: "formatCreatedAt",
        key: "registered",
        sorter: (a, b) => {
          return (
            moment(a.formatCreatedAt).unix() - moment(b.formatCreatedAt).unix()
          );
        },
        ...this.getColumnSearchProps(
          "formatCreatedAt",
          this.props.intl.formatMessage({
            id: "admin.registered",
            defaultMessage: "Registered"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.tenure",
          defaultMessage: "Tenure"
        }),
        dataIndex: tenureState,
        key: "tenure",
        sorter: (a, b) => {
          return a[tenureState].localeCompare(b[tenureState]);
        },
        ...this.getColumnSearchProps(
          tenureState,
          this.props.intl.formatMessage({
            id: "admin.tenure",
            defaultMessage: "Tenure"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.profileStatus",
          defaultMessage: "Profile Status"
        }),
        render: record => {
          return this.renderStatusDropdown(
            record.id,
            record.user.inactive,
            record.flagged
          );
        }
      }
    ];

    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <Title>Users</Title>
        <div align="right">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            size={size}
            onClick={this.handleApply}
            disabled={Object.entries(statuses).length === 0}
          >
            {this.props.intl.formatMessage({
              id: "admin.apply",
              defaultMessage: "Apply"
            })}
          </Button>
        </div>
        <Table columns={user_table_columns} dataSource={allUsers} />
      </AppLayout>
    );
  }
}

export default injectIntl(AdminUser);