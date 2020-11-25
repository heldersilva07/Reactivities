import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'



const ActivityDashboard: React.FC = () => {
    //const activityStore = useContext(ActivityStore);
    //const { editMode, activity } = activityStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
                {/* <List>
                    {activities.map((activity: any) => (
                        <List.Item key={activity.id}>{activity.title}</List.Item>
                    ))}
                </List> */}
            </Grid.Column>
            <Grid.Column width={6}>
                {/* {activity && !editMode && (
                    <ActivityDetails/>
                )}
                {editMode && <ActivityForm
                    key={activity?.id}
                    activity={activity!}
                />} */}
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)
