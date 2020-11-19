import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handlerCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handlerEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handlerDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar OpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handlerCreateActivity}
          editActivity={handlerEditActivity}
          deleteActivity={handlerDeleteActivity}
        />
      </Container>

    </Fragment>
  );
}

export default App;