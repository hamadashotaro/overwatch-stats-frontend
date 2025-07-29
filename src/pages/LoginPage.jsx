import { Flex, Center, Stack, Group, Title, Text, Button, TextInput, PasswordInput } from '@mantine/core'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import api from '../api/axios';

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const nav = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post("login/", {username,password})
            localStorage.setItem("access", response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            nav("/stats")
        } catch (error) {
            alert("username/password incorrect")
        }
    }

    return (
        <Flex align="center" justify="center">
            <Stack w={400}>
                <Center>
                    <Text fw={700}>Login</Text> {/* fw={700} means bold text */}
                </Center>

                <TextInput label="username" value={username} onChange={(event) => setUsername(event.currentTarget.value)}></TextInput>
                <PasswordInput label="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}></PasswordInput>
                <Button onClick={handleLogin}>Login Account</Button>
            </Stack>
        </Flex>
    );
}
