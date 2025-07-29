import api from "../api/axios";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Flex, Container, Table, TextInput, Select, Button } from "@mantine/core"

export default function StatsPage() {
    const [stats, setStats] = useState([]);

    const [hero, setHero] = useState("");
    const [map, setMap] = useState("");
    const [game_mode, setGameMode] = useState("");
    const [result, setResult] = useState("");
    const [duo, setDuo] = useState("");

    const nav = useNavigate();

    const handleAddStat = async () => {
        const token = localStorage.getItem("access");
        try {
            const res = await api.post(
                "stats/",
                { hero, map, game_mode, result, duo },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setStats(prev => [...prev, res.data]); // update the table
            // clear the form
            setHero("");
            setMap("");
            setGameMode("");
            setResult(null);
            setDuo("");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            nav("/login");
            return;
        }

        api.get("stats/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setStats(res.data))
            .catch((err) => {
                console.error(err);
                nav("/login");
            });
    }, []);

    return (
        <Container>
            <Table withTableBorder="true">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Hero</Table.Th>
                        <Table.Th>Map</Table.Th>
                        <Table.Th>Gamemode</Table.Th>
                        <Table.Th>Result</Table.Th>
                        <Table.Th>Duo</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {stats.map((item, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{item.hero}</Table.Td>
                            <Table.Td>{item.map}</Table.Td>
                            <Table.Td>{item.game_mode}</Table.Td>
                            <Table.Td>{item.result}</Table.Td>
                            <Table.Td>{item.duo}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Flex direction="column" gap="sm" mt="lg">
                <TextInput label="Hero" placeholder="Lifeweaver (max length: 30)" value={hero} maxLength={30} onChange={e => setHero(e.currentTarget.value)} />
                <TextInput label="Map" value={map} placeholder="Havana (max length: 30)" maxLength={30} onChange={e => setMap(e.currentTarget.value)} />
                <TextInput label="Game Mode" value={game_mode} placeholder="Escort (max length: 30)" maxLength={30} onChange={e => setGameMode(e.currentTarget.value)} />
                <Select
                    label="Result"
                    placeholder="Select from dropdown - W for Win, L for Loss"
                    data={[
                        { value: "W", label: "Win" },
                        { value: "L", label: "Loss" },
                    ]}
                    value={result}
                    onChange={setResult}
                />
                <TextInput label="Support Duo" value={duo} placeholder="Ana (max length: 30)" maxLength={30} onChange={e => setDuo(e.currentTarget.value)} />
                <Button onClick={handleAddStat}>Add Stat</Button>
            </Flex>
        </Container>
    );
}