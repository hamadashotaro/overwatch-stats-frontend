import api from "../api/axios";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Flex, Container, Table, TextInput, Select, Button } from "@mantine/core"

export default function StatsPage() {
    const [stats, setStats] = useState([]);

    const [hero, setHero] = useState(null);
    const [map, setMap] = useState(null);
    const [game_mode, setGameMode] = useState(null);
    const [result, setResult] = useState(null);
    const [duo, setDuo] = useState(null);

    const nav = useNavigate();

    const tanklist = ["D.Va", "Doomfist", "Hazard", "Junker Queen",
        "Mauga", "Orisa", "Ramattra", "Reinhardt", "Roadhog", "Sigma", "Winston", "Wrecking Ball", "Zarya"];

    const dpslist = ["Ashe", "Bastion", "Cassidy", "Echo", "Freja",
        "Genji", "Hanzo", "Junkrat", "Mei", "Pharah", "Reaper", "Sojourn", "Soldier: 76", "Sombra", "Symmetra", "Torbjörn", "Tracer", "Venture", "Widowmaker"];

    const supplist = ["Ana", "Baptiste", "Brigitte", "Illari", "Juno", "Kiriko", "Lifeweaver", "Lúcio", "Mercy", "Moira", "Zenyatta"];

    const controllist = ["Antarctic Peninsula", "Busan", "Illios", "Lijiang Tower", "Nepal", "Oasis", "Samoa"];

    const escortlist = ["Circuit Royal", "Dorado", "Havana", "Junkertown", "Rialto", "Route 66", "Shambali Monastery", "Watchpoint: Gibraltar"];

    const fplist = ["Aatlis", "New Junk City", "Suravasa"];

    const hybridlist = ["Blizzard World", "Eichenwalde", "Hollywood", "King's Row", "Midtown", "Numbani", "Paraíso"];

    const pushlist = ["Colosseo", "Esperança", "New Queen Street", "Runasapi"];

    const clashlist = ["Hanaoka", "Throne of Anubis"];

    const mapGroupsData = [
        { group: "Control", items: controllist },
        { group: "Escort", items: escortlist },
        { group: "Flashpoint", items: fplist },
        { group: "Hybrid", items: hybridlist },
        { group: "Push", items: pushlist },
        { group: "Clash", items: clashlist },
    ];

    const heroIsTankOrDPS = hero && tanklist.includes(hero) || hero && dpslist.includes(hero);

    useEffect(() => {
        if (heroIsTankOrDPS) {
            setDuo("N/A"); // Clear duo selection if a tank hero is chosen
        } else {
            if (duo === "N/A") {
                setDuo(null);
            }
        }
    }, [heroIsTankOrDPS, duo]); // Rerun when isHeroTank changes

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
            setHero(null);
            setMap(null);
            setGameMode(null);
            setResult(null);
            setDuo(null);
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

    const setGameModeAutomatic = (selectedMap) => {
        setMap(selectedMap);

        let detectedGameMode = null;
        for (const group of mapGroupsData) {
            if (group.items.includes(selectedMap)) {
                detectedGameMode = group.group;
                break;
            }
        }

        setGameMode(detectedGameMode)
    }

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
                <Select
                    label="Hero"
                    placeholder="Lifeweaver"
                    data={[
                        { group: "Tank", items: tanklist },
                        { group: "DPS", items: dpslist },
                        { group: "Support", items: supplist },
                    ]}
                    value={hero}
                    onChange={setHero}
                />
                <Select
                    label="Map"
                    placeholder="Illios"
                    data={[
                        { group: "Control", items: controllist },
                        { group: "Escort", items: escortlist },
                        { group: "Flashpoint", items: fplist },
                        { group: "Hybrid", items: hybridlist },
                        { group: "Push", items: pushlist },
                        { group: "Clash", items: clashlist },
                    ]}
                    value={map}
                    onChange={setGameModeAutomatic}
                />
                <Select
                    label="Game Mode"
                    placeholder="Control"
                    data={["Control", "Escort", "Flashpoint", "Hybrid", "Push", "Clash"]}
                    value={game_mode}
                    onChange={setGameMode}
                />
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
                <Select
                    label="Support Duo"
                    placeholder="Ana"
                    data={supplist}
                    value={duo}
                    onChange={setDuo}
                    disabled={heroIsTankOrDPS}
                />
                <Button onClick={handleAddStat}>Add Stat</Button>
            </Flex>
        </Container>
    );
}