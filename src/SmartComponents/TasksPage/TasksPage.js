import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { StackItem, Stack } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { TasksTabs } from '../../PresentationalComponents';
import RunTaskModal from '../RunTaskModal/RunTaskModal';
import {
  TASKS_PAGE_HEADER,
  TASKS_PAGE_HEADER_FLEX_PROPS,
  TASKS_PAGE_TABS,
} from '../../constants';
import FlexibleFlex from '../../PresentationalComponents/FlexibleFlex/FlexibleFlex';
import AvailableTasks from '../AvailableTasks/AvailableTasks';
import CompletedTasksTable from '../../SmartComponents/CompletedTasksTable/CompletedTasksTable';
import { fetchAvailableTask, fetchExecutedTasks } from '../../../api';
import { dispatchNotification } from '../../Utilities/Dispatcher';

import './tasks-page.scss';
import { createNotification, isError } from '../completedTaskDetailsHelpers';

const TasksPage = ({ tab }) => {
  const history = useHistory();
  const [tabIndex, setTab] = useState(tab);
  const [runTaskModalOpened, setRunTaskModalOpened] = useState(false);
  const [activeTask, setActiveTask] = useState({});
  const [error, setError] = useState();
  //const [activityError, setActivityError] = useState();
  const [tabsLoading, setTabsLoading] = useState(true);
  const [tasksRunning, setTasksRunning] = useState(false);

  useEffect(() => {
    if (tab === 0) {
      history.push('available');
    }
  }, []);

  useEffect(async () => {
    if (tabsLoading) {
      const path = `?limit=1000&offset=0`;
      let activities = await fetchExecutedTasks(path);
      if (isError(activities)) {
        createNotification(activities);
        //setActivityError(activities);
      } else {
        if (activities.data.some((task) => task.status === 'Running')) {
          setTasksRunning(true);
          setTabsLoading(false);
        }
      }
    }
  }, [tabsLoading]);

  const updateTab = (event, index) => {
    history.push(index ? 'executed' : 'available');
    setTab(index);
  };

  const openTaskModal = async (value, slug) => {
    const task = await fetchAvailableTask(slug);
    if (task?.response?.status && task?.response?.status !== 200) {
      setError(task);
      dispatchNotification({
        variant: 'danger',
        title: 'Error',
        description: task.message,
        dismissable: true,
        autoDismiss: false,
      });
    } else {
      setActiveTask(task);
    }

    setRunTaskModalOpened(value);
  };

  return (
    <React.Fragment>
      <RunTaskModal
        description={activeTask.description}
        error={error}
        isOpen={runTaskModalOpened}
        selectedSystems={[]}
        setModalOpened={setRunTaskModalOpened}
        slug={activeTask.slug}
        title={activeTask.title}
      />
      <PageHeader>
        <FlexibleFlex
          flexContents={TASKS_PAGE_HEADER}
          flexProps={TASKS_PAGE_HEADER_FLEX_PROPS}
        />
      </PageHeader>
      <TasksTabs
        className="tabs-background"
        tabIndex={tabIndex}
        updateTab={updateTab}
        tabsList={TASKS_PAGE_TABS}
        tabsLoading={tabsLoading}
        //setTabsLoading={setTabsLoading}
        tasksRunning={tasksRunning}
      />
      <Main>
        <Stack hasGutter>
          <StackItem>
            {tabIndex === 0 ? (
              <AvailableTasks openTaskModal={openTaskModal} />
            ) : (
              <CompletedTasksTable openTaskModal={openTaskModal} />
            )}
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

TasksPage.propTypes = {
  tab: propTypes.number,
};

export default TasksPage;
