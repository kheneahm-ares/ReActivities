import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import ActivityService from "../api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editCreateMode, setEditCreateMode] = useState(false);

  const handleEditCreateToggle = () => {
    let newEditCreateMode: boolean = !editCreateMode;

    setEditCreateMode(newEditCreateMode);
  };

  const handleSelectActivity = (id: string | null) => {
    if (id == null) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activities.filter(a => a.id === id)[0]);
    }
    setEditCreateMode(false);
  };

  const handleCreateActivity = (newActivity: IActivity) => {
    //add a new activity along with existing activities
    //create new activity on server, wait, THEN, do something with promise
    ActivityService.create(newActivity).then(response => {
      setActivities([...activities, newActivity]);
      setSelectedActivity(newActivity);
      setEditCreateMode(false);
    });
  };

  const handleEditActivity = (activityToEdit: IActivity) => {
    ActivityService.update(activityToEdit).then(() => {
      //update specific activity, so re-set activities with set w/o activity we're editing
      //then add that newly edited activity
      setActivities([
        ...activities.filter(a => a.id !== activityToEdit.id),
        activityToEdit
      ]);
      setSelectedActivity(activityToEdit);
      setEditCreateMode(false);
    });
  };

  const handleDeleteActivity = (activityId: string) => {

    ActivityService.delete(activityId).then(() => 
    {
      setActivities([...activities.filter(a => a.id !== activityId)]);
    });
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditCreateMode(true);
  };

  //second param ([]) is set empty bc we're telling react to not run this method again
  //we're using it doesn't depend on any values from props or state so no re-run
  useEffect(() => {
    ActivityService.list().then(response => {
      let activities: IActivity[] = [];

      //splitting in order show in form
      response.forEach(a => {
        a.date = a.date.split(".")[0];

        activities.push(a);
      });
      setActivities(activities);
    });
  }, []);

  return (
    <Fragment>
      <NavBar handleOpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          handleEditCreateToggle={handleEditCreateToggle}
          IsEditCreateMode={editCreateMode}
          handleCreateActivity={handleCreateActivity}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
