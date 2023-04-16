import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import UserCard from './UserCard';
import { toast } from 'react-toastify';
import './RightSide.css'

const OtherUsersDisplay = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isExtraLarge = useMediaQuery({ minWidth: 1200 });
  const isLarge = useMediaQuery({ minWidth: 992, maxWidth: 1199 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isSmall = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        const filteredUsers = response.data.filter(
          (user) => user.username !== localStorage.getItem('user')
        );
        setUsers(filteredUsers.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching other profiles...');
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div>
        { !isSmall && <h4>Other Profiles</h4> }
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  const cardTable = 
  (
    <div className="scrollable-container">
      <div className="d-flex">
        {users.map((user) => (
          <div key={user.username} className="card-container">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
  // (
  //   <div className="scrollable-container">
  //     <Table className="card-table">
  //       <tbody>
  //         <tr>
  //           {users.map((user) => (
  //             <td key={user.username} className="border-0">
  //               <UserCard user={user} />
  //             </td>
  //           ))}
  //         </tr>
  //       </tbody>
  //     </Table>
  //   </div>
  // );

  return (
    <Container>
      { !isSmall && <h4>Other Profiles</h4> }
      {isExtraLarge ? (
        <Row>
          {users.map((user) => (
            <Col key={user.username} xl={4}>
              <UserCard user={user} />
            </Col>
          ))}
        </Row>
      ) : isLarge || isMedium ? (
        cardTable
      ) : (
        <Row>
          {users.map((user) => (
            <Col key={user.username} sm={12} className="mb-2">
              <UserCard user={user} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OtherUsersDisplay;
