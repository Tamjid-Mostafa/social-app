import React from 'react';
import { HashLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
        <HashLoader color="#27f8ff" />
      </div>
    );
};

export default Loader;