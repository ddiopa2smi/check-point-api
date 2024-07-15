import React, { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastComp(props) {

    const { showToast, setShowToast, onCloseToast, position } = props;
    // const [showToast, setShowToast] = useState(false);

    return (
        <Row>
            <Col xs={6}>
                <ToastContainer
                    className="p-3"
                    position={position}
                    style={{ zIndex: 1 }}
                >
                    <Toast color='red' bg='warning' onClose={onCloseToast} show={showToast} delay={3000} autohide>
                        {/* <Toast.Header>
                            <img
                                src="logo512.png/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header> */}
                        <Toast.Body>User updated successfuly !!!</Toast.Body>
                    </Toast>
                </ToastContainer>

            </Col>
        </Row>
    );
}

export default ToastComp;