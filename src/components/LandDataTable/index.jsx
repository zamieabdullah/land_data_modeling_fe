import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

import { LandDataAPI } from "../../api/landData";
import { getMonthName } from '../../utils';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LandDataTable = ({ state }) => {
    const [landData, setLandData] = useState(null);
    const [yearData, setYearData] = useState(null);
    // const [dataKeys, setDataKeys] = useState(null);
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString('default', { month: 'long' });
    
    useEffect(() => {
        if (state) {
            const loadStateData = async () => {
                const resp = await LandDataAPI.getRecentStateData(state);
                setLandData(resp)
            }

            const loadYearData = async () => {
                const resp = await LandDataAPI.getRecentMonthlyStateData(state);
                setYearData(resp);
                // setDataKeys(Object.keys(resp[0]));
            }

            loadStateData();
            loadYearData();
        }
    }, [state])

    const getMonthlyData = () => {
        const month = []
        const y_values = []
        yearData?.forEach((m) => {
            month.push(getMonthName(m['month']))
            y_values.push(m['active_listing_count'])
        })

        const data = {
            labels: month.reverse(),
            datasets: [
                {
                    label: "Active Listing Count",
                    data: y_values.reverse(),
                    borderColor: "rgba(75,192,192,1)", // Line color
                    fill: false,                     // Fill below the line
                }
            ]
        }
        
        return data
    }

    const config = {
        type: 'line',
        data: getMonthlyData(),
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `2024 ${state} Trends`,
                }
            }
        },
    };

    return (
        <div className='container'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '4rem'}}>
                <div>
                    <h1 className='mt-5 mb-4'>
                        {month} {year} {state} Data
                    </h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Total Active Listings</th>
                                <th>Total New Listings</th>
                                <th>Total Pending Listings</th>
                                <th>Avg. Listing Price</th>
                                <th>Median Listing Price</th>
                                <th>Median Days on Market</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{landData?.active_listing_count}</td>
                                <td>{landData?.new_listing_count}</td>
                                <td>{landData?.pending_listing_count}</td>
                                <td>{landData?.average_listing_price}</td>
                                <td>{landData?.median_listing_price}</td>
                                <td>{landData?.median_days_on_market}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h2 className='mb-4'>{year} Monthly Data</h2>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total Active Listings</th>
                                <th>Total New Listings</th>
                                <th>Total Pending Listings</th>
                                <th>Avg. Listing Price</th>
                                <th>Median Listing Price</th>
                                <th>Median Days on Market</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                yearData?.map((month, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{getMonthName(month?.month)}</td>
                                            <td>{month?.active_listing_count}</td>
                                            <td>{month?.new_listing_count}</td>
                                            <td>{month?.pending_listing_count}</td>
                                            <td>{month?.average_listing_price}</td>
                                            <td>{month?.median_listing_price}</td>
                                            <td>{month?.median_days_on_market}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <h2 className='my-4'>Trends</h2>
                    <Line options={config?.options} data={config.data}/>
                </div>
            </div>
        </div>
    )
}

LandDataTable.propTypes = {
    state: PropTypes.string.isRequired
}