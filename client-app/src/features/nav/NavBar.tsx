import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'



const NavBar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activiteis'
                />
                <Menu.Item>
                    <Button onClick={activityStore.openCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default observer(NavBar)
