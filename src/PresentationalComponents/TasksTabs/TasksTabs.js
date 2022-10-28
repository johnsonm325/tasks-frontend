import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import TasksTabsContent from './TasksTabsContent';

const TasksTabs = ({
  className,
  //setTabsLoading,
  tabIndex,
  tabsList,
  tabsLoading,
  tasksRunning,
  updateTab,
}) => {
  console.log(tabsList, 'tabsList');
  return (
    <Tabs className={className} activeKey={tabIndex} onSelect={updateTab}>
      {tabsList.map((tabName, index) => (
        <Tab
          id={`tabs-page-${index}`}
          key={`tabs-page-${index}`}
          eventKey={index}
          title={
            <TasksTabsContent
              tabsLoading={tabName === 'Activity' ? tabsLoading : null}
              tasksRunning={tabName === 'Activity' ? tasksRunning : null}
              title={tabName}
            />
          }
          //title={tabContent(tabsLoading, tasksRunning)}
        />
      ))}
    </Tabs>
  );
};

TasksTabs.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  tabsList: PropTypes.array,
  tabsLoading: PropTypes.bool,
  tasksRunning: PropTypes.bool,
  updateTab: PropTypes.func,
};

export default TasksTabs;
