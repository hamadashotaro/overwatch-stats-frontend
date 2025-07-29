import { Flex, Center, Stack, Group, Title, Text, Button, TextInput, PasswordInput } from '@mantine/core'
import { Outlet, useNavigate } from "react-router-dom"

export default function HomePage() {

    const nav = useNavigate();

    const handleRedirectRegister = () => {
        nav("/register")
    }

    const handleRedirectLogin = () => {
        nav("/login")
    }

    const handleRedirectStats = () => {
        nav("/stats")
    }

    return (
        <>
            <Flex justify="center" align="center" direction="column">
                <Title>Overwatch Stats Tracker</Title>
                <Text>Created by Shotaro Hamada</Text>
                <Group>
                    <Button color="teal" onClick={handleRedirectRegister}>Register an account</Button>
                    <Button onClick={handleRedirectStats}>Stats</Button>
                    <Button color="cyan" onClick={handleRedirectLogin}>Login to an account</Button>
                </Group>
            </Flex>
            <Outlet />
        </>
    );
}