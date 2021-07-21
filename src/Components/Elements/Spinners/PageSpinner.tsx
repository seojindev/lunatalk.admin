import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

export default function PageSpinner() {
    return (
        <React.Fragment>
            <PulseLoader color="#ddd" size="15px" />
        </React.Fragment>
    );
}
