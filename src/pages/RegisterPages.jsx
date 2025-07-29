import { useForm } from "@mantine/form";
import { Flex, Center, Stack, Group, Title, Text, Button, TextInput, PasswordInput } from '@mantine/core'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

export default function RegisterPage() {
    const nav = useNavigate();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: { username: "", password: "", cpassword: "" },
        validate: {
            username: (value) => (value ? null : 'Username is required'),
            password: (value) => (value ? null : 'Password is required'),
            cpassword: (value, values) =>
                value !== values.password ? "Password did not match" : null,
        },
    });

    const handleRegister = async () => {
        const username = form.getValues().username
        const password = form.getValues().password

        try {
            const response = await api.post("register/", { username, password });
            form.reset();
            nav("/login")
        } catch (error) {
            console.log("Error " + error)
            if (error.response && error.response.data) {
                form.setErrors(error.response.data)
            }
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleRegister)}>
            <Flex align="center" justify="center">
                <Stack w={400}>
                    <Center>
                        <Text fw={700}>Register</Text> {/* fw={700} means bold text */}
                    </Center>

                    <TextInput label="username" key={form.key("username")} {...form.getInputProps("username")}></TextInput>
                    <PasswordInput label="password" key={form.key("password")} {...form.getInputProps("password")}></PasswordInput>
                    <PasswordInput label="confirm password" key={form.key("cpassword")} {...form.getInputProps("cpassword")}></PasswordInput>
                    <Text></Text>
                    <Button type="submit">Create Account</Button>
                </Stack>
            </Flex>
        </form>
    );
}
