import React from 'react'
import { Container, Menu, Button } from 'semantic-ui-react'

interface IProps {
    OpenCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ OpenCreateForm }) => {
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
                    <Button onClick={OpenCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}

export default NavBar
