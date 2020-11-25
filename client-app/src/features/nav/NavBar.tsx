import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'



const NavBar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities'
                    name='Activiteis'
                />
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button onClick={activityStore.openCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default observer(NavBar)
