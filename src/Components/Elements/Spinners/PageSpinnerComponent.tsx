import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default function PageSpinnerComponent() {
    return (
        <React.Fragment>
            <PulseLoader color="#ddd" size="15px" />
        </React.Fragment>
    );
}
