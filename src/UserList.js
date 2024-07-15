import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Alert, Button, Form, Stack } from 'react-bootstrap';
import { PencilFill, Trash2Fill } from 'react-bootstrap-icons';
import ModalComp from './components/ModalComp';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToastComp from './components/ToastComp';

const initialesValues = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
        city: ''
    },

}

export default function UserList() {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [values, setValues] = useState(initialesValues);
    const [showToast, setShowToast] = useState(false);
    const [tabMax, setTabMax] = useState([]);
    const [x, setX] = useState(0);


    useEffect(() => {

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((resp) => setData(resp.data))
            .catch((error) => console.log(error))

    }, [x]);

    useEffect(() => {
        handleClose();
        setTabMax(() => data.map((user) => user.id));
    }, [data])

    const handleClose = () => { setShow(false); setValues(initialesValues) }
    const handleShow = () => setShow(true);

    const handleDelete = ((row) => {
        setData(data.filter((user) => user.id !== row.id))
    })

    const onEditEmployee = (row) => {
        setValues(row);
        handleShow();

    }

    const handleRefresh = () => {
        setX(Math.random());
        // setSearch(null);
    }

    const handleUpdate = (id, newValue) => {
        setData(data.map((user) => user.id === id ? newValue : user));
        setShowToast(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const _id = values.id;

        if (_id === 0) {
            values.id = Math.max(...tabMax) + 1;
            console.log(values);
            // values.address.city = values.address
            setData([...data, values]);

        } else {

            handleUpdate(_id, values);
        }

    }

    const handleFilterByName = (e) => {
        //
        let val = e.target.value;

        if (val === '') {
            handleRefresh();
        } else {
            //conversion de la recherche en minuscule
            const val_min = val.toLowerCase();

            const listFilter = [...data].filter(user => {
                // conversion du nom en minuscule pour eviter les problemes de casse
                const NomEnMinuscule = user.name.toLowerCase();
                return NomEnMinuscule.includes(val_min)
            });

            setData(listFilter)
        }


    }

    const onCloseToast = () => setShowToast(false);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const form = (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        size='sm'
                        type="text"
                        name='name'
                        value={values.name}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridUserName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                        size='sm'
                        type="text"
                        name='username'
                        value={values.username}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        size='sm'
                        type="email"
                        name='email'
                        value={values.email}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        size='sm'
                        type="text"
                        name='phone'
                        value={values.phone}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAdress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        size='sm'
                        as='textarea'
                        rows={3}
                        name='address'
                        value={values.address.city}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridSite">
                    <Form.Label>Web Site</Form.Label>
                    <Form.Control
                        size='sm'
                        type="text"
                        name='website'
                        value={values.website}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        size='sm'
                        type="text"
                        name='phone'
                        value={values.phone}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Button variant="success" type="submit" block>
                    {values.id == 0 ? 'Add New User' : 'Update User'}
                </Button>
            </Row>

        </Form >
    );

    return (
        <div>
            <Container>
                <Stack gap={3}>
                    <Alert style={{ marginBottom: '2px', marginTop: '10px' }} variant='success'>
                        <h2 style={{ textAlign: 'center' }}>List of Users</h2>
                    </Alert>
                    <Stack direction="horizontal" gap={3} style={{ textAlign: 'end' }}>
                        <Form.Control onChange={handleFilterByName} className="me-auto" placeholder="Search By Name..." />
                        <Button variant="outline-success" onClick={handleShow} style={{ width: '150px' }}>Add New</Button>
                        <div className="vr" />
                        <Button variant="outline-danger" onClick={handleRefresh}>Refresh</Button>

                    </Stack>
                    <Table striped bordered hover >
                        <thead >
                            <tr style={{ backgroundColor: 'green' }}>
                                <th>#</th>
                                <th >Name</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Adress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) =>
                            (<tr>
                                <td align='center'>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.address.city}</td>
                                <td align='center'>
                                    <button type="button" class="btn btn-outline-primary btn-sm me-2" onClick={() => onEditEmployee(user)}><PencilFill /></button>
                                    <button type="button" class="btn btn-outline-danger btn-sm " onClick={() => handleDelete(user)}><Trash2Fill /></button>
                                </td>
                            </tr>))}

                        </tbody>
                    </Table>
                </Stack>
                <ModalComp
                    show={show}
                    onHide={handleClose}
                    title={values.id == 0 ? 'Add New User' : `Update User #: ${values.id}`}
                    onClick={handleClose}
                    contentBody={form}
                />
                <ToastComp
                    showToast={showToast}
                    onCloseToast={onCloseToast}
                    position='top-end'
                />
            </Container>


        </div>
    )
}
