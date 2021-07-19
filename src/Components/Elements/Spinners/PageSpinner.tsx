import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { Box } from '@material-ui/core';

export default function PageSpinner() {
    return (
        <React.Fragment>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <PulseLoader color="#ddd" size="15px" />
            </Box>
        </React.Fragment>
    );
}
