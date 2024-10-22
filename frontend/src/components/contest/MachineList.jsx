import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMachines } from '../../api/axiosInstance';
//import '../../css/Machine.scss';

const Machine = () => {
  const [machines, setMachines] = useState([]);

  // 문제 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await getAllMachines();
        setMachines(response.machines);  // response에서 machines 배열을 추출
      } catch (error) {
        console.error('Error fetching machine:', error.message || error);
      }
    };

    fetchMachine();
  }, []);

  return (
    <div>
      <h2 style={{ margin: 20 }}>machine list</h2>
      <table className='Machine-table'>
        <thead>
          <tr>
            <th>Machine</th>
            <th>Difficulty</th>
            <th>Rating</th>
            <th>User Owns</th>
            <th>System Owns</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine, index) => (
            <tr key={machine.id} className="machine-item">
              <td>
                <Link to={`/Contest/${machine.name}`} state={{ machineId: machine.id}}>
                  <span className="machine-name">{machine.name}</span>
                </Link>
              </td>
              <td>{machine.info}</td>
              <td>{machine.repute}</td>
              <td>{/* User Owns 데이터 추가 */}</td>
              <td>{/* System Owns 데이터 추가 */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Machine;
