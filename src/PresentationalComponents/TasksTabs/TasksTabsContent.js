import React from 'react';
import PropTypes from 'prop-types';

import { TabTitleText } from '@patternfly/react-core';
import { InProgressIcon } from '@patternfly/react-icons';

const TasksTabsContent = ({ tabsLoading, tasksRunning, title }) => {
  const renderTitle = () => {
    if (tasksRunning) {
      return (
        <div>
          <span>{title}</span>
          <span style={{ marginLeft: '4px' }}>
            <InProgressIcon color="#2B9AF3" />
          </span>
        </div>
      );
    } else {
      return <div>{title}</div>;
    }
  };

  return <TabTitleText>{renderTitle()}</TabTitleText>;
};

TasksTabsContent.propTypes = {
  tabsLoading: PropTypes.bool,
  tasksRunning: PropTypes.bool,
  title: PropTypes.string,
};

export default TasksTabsContent;
