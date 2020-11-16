import React, { useState, useEffect } from 'react'
import { Grid, Row, Col, Table } from 'rsuite';
import { CountryFlag } from '../components/CountryFlag';
import axios from 'axios';
const { Column, Cell, HeaderCell, Pagination } = Table;

const CountryCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div
            style={{
                width: 40,
                height: 40,
                background: '#f5f5f5',
                borderRadius: 20,
                marginTop: 2,
                overflow: 'hidden',
                display: 'inline-block'
            }}
        >
            <CountryFlag country={rowData[dataKey]} />
        </div>
    </Cell>
);

export const LeaderboardPage = () => {

    const [leaders, setLeaders] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLeaders([]);
        axios.get(`https://astellia.club/frontend/api/v1/leaderboard?mode=0&p=${page}&l=20&relax=false&country=`).then(res => {
            const inter = res.data.map(r => ({
                ...r,
                place: ((page - 1) * 20) + r.place
            }))
            setLeaders(inter);
        }).catch(e => console.error(e));
    }, [page])

    const handleChangePage = (dataKey) => {
        setPage(dataKey);
    }



    return (
        <div>
            <Grid fluid>
                <Row>
                    <Col xs={4}></Col>
                    <Col xs={16}>
                        <div className="lb-header">
                            leaderboard
                        </div>
                        <div className='lb-content'>
                            <Table
                                height={600}
                                data={leaders}
                                loading={!leaders.length}
                                className='ta-center'
                            >
                                <Column flexGrow={1} align="center" >
                                    <HeaderCell>Place</HeaderCell>
                                    <Cell dataKey="place" />
                                </Column>

                                <Column flexGrow={2} >
                                    <HeaderCell>Country</HeaderCell>
                                    <CountryCell dataKey="country" />
                                </Column>

                                <Column flexGrow={4} >
                                    <HeaderCell>Username</HeaderCell>
                                    <Cell dataKey="username" />
                                </Column>

                                <Column flexGrow={2} >
                                    <HeaderCell>PP</HeaderCell>
                                    <Cell dataKey="pp" />
                                </Column>

                                <Column flexGrow={2}>
                                    <HeaderCell>Accuracy</HeaderCell>
                                    <Cell dataKey="accuracy" />
                                </Column>
                                <Column flexGrow={1}>
                                    <HeaderCell>Level</HeaderCell>
                                    <Cell dataKey="level" />
                                </Column>
                            </Table>
                            <Pagination
                                activePage={page}
                                displayLength={1}
                                total={5}
                                onChangePage={handleChangePage}
                            />
                        </div>
                    </Col>
                    <Col xs={4}></Col>
                </Row>
            </Grid>
        </div>
    )
}
