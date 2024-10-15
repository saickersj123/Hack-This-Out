import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from '../../components/section/Main'
import { getMachine } from '../../api/axiosInstance';

const Machine = () => {

  return (
    <Main title={`Machine`} description="Machine 리스트">

    </Main>
  );
};

export default Machine;
