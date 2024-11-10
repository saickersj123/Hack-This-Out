import React from 'react';
import MachineList from '../../components/machine/MachineList';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';

import '../../assets/scss/machine/MachineListPage.scss';


const MachineListPage: React.FC = () => {
    return (
        <Main>
            <div className="rank-machine">
                <svg className="rank-machine-background" viewBox="0 0 1149 213" fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <rect width="1149" height="213" rx="30" fill="url(#paint0_linear_3_354)"></rect>
                    <line x1="575.25" y1="-0.000305176" x2="575.25" y2="213" stroke="#A5A5A5"></line>
                    <defs>
                        <linearGradient id="paint0_linear_3_354" x1="0" y1="106.5" x2="1149" y2="106.5"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"></stop>
                            <stop offset="0.635" stop-color="#C7DCF5"></stop>
                            <stop offset="1" stop-color="#8EB9EA"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="register-machine">
                <svg className="background-svg" viewBox="0 0 229 213" fill="none" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none">
                    <path
                        d="M0 30C0 13.4315 13.4315 0 30 0H199C215.569 0 229 13.4315 229 30V183C229 199.569 215.569 213 199 213H30C13.4315 213 0 199.569 0 183V30Z"
                        fill="url(#paint0_linear_3_348)"></path>
                    <defs>
                        <linearGradient id="paint0_linear_3_348" x1="229" y1="112.049" x2="0.00000420861" y2="112.451"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#5F9DE3"></stop>
                            <stop offset="1" stop-color="#8EB9EA"></stop>
                        </linearGradient>
                    </defs>
                </svg>

                <svg className="camera-svg" width="59" height="58" viewBox="0 0 59 58" fill="none"
                    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                        d="M3.33325 9.54167C3.33325 7.80671 4.02246 6.14281 5.24926 4.91601C6.47606 3.68921 8.13996 3 9.87492 3H49.1249C50.8599 3 52.5238 3.68921 53.7506 4.91601C54.9774 6.14281 55.6666 7.80671 55.6666 9.54167V48.7917C55.6666 50.5266 54.9774 52.1905 53.7506 53.4173C52.5238 54.6441 50.8599 55.3333 49.1249 55.3333H9.87492C8.13996 55.3333 6.47606 54.6441 5.24926 53.4173C4.02246 52.1905 3.33325 50.5266 3.33325 48.7917V9.54167Z"
                        stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M3.33325 19.3542H22.9583L26.2291 12.8125L32.7708 25.8958L36.0416 19.3542H55.6666M3.33325 35.7083H55.6666M36.0416 45.5208V45.5535M45.8541 45.5208V45.5535"
                        stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>

                <p className="register-text">register machine</p>
                <Link to='/machine/register'>
                    <button className="button-background"></button>

                    <svg className="arrow-svg" width="73" height="24" viewBox="0 0 73 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none">
                        <path
                            d="M61.657 23.1065L71.5995 13.164C71.9291 12.8344 72.1143 12.3874 72.1143 11.9212C72.1143 11.4551 71.9291 11.008 71.5995 10.6784L61.657 0.735991C61.4114 0.489424 61.098 0.32136 60.7567 0.253105C60.4154 0.184848 60.0615 0.219473 59.7398 0.352593C59.4182 0.485712 59.1434 0.711328 58.9501 1.00084C58.7569 1.29035 58.654 1.63072 58.6544 1.9788L58.6569 10.1639L0.759612 10.1614V13.681L58.6569 13.6786L58.6544 21.8637C58.654 22.2117 58.7569 22.5521 58.9501 22.8416C59.1434 23.1311 59.4182 23.3568 59.7398 23.4899C60.0615 23.623 60.4154 23.6576 60.7567 23.5894C61.098 23.5211 61.4114 23.353 61.657 23.1065Z"
                            fill="url(#paint0_linear_3_462)"></path>
                        <defs>
                            <linearGradient id="paint0_linear_3_462" x1="54.3817" y1="-6.53939" x2="17.4604" y2="30.3819"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#0353AF"></stop>
                                <stop offset="0.74" stop-color="#7AB4F8"></stop>
                                <stop offset="1" stop-color="#A4A4A4"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </Link>
            </div>

            <MachineList />

        </Main >
    );
};

export default MachineListPage;