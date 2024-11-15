import { useState, useEffect } from 'react'

import { LandDataTable } from '../../components/LandDataTable';
import { MapChart } from '../../components/MapChart'

export const LandData = ({}) => {
    const [currState, setCurrState] = useState(null);
    
    const handleCurrState = (state) => {
        setCurrState(state)
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <h1>Real Estate Info</h1>
            <MapChart handleState={handleCurrState}/>
            {currState && (
                <div>
                    <LandDataTable state={currState}/>
                </div>
            )}
        </div>
    )
}