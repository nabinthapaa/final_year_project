"use client";
import React, {useEffect, useState} from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Select, MenuItem } from '@mui/material';
import axios from "axios";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const AdminVerificationPage = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const { data: session } = useSession();
    const router = useRouter();
    const [data, setData] = useState([]);



    const fetchData = async () => {
        try {
            const doctorDetail = await axios.get(`/api/getAllDoctor`);
            setData(doctorDetail.data.data);
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    }
    useEffect(() => {
        const adminSession = sessionStorage.getItem('admin');
        if(adminSession !== 'true'){
            router.replace('/admin/login')
        }
       fetchData();

    },[]);

    const handleStatusChange = async (event: Event, id: number) => {
        const verification = event.target.value === 'verified';
        const payload = {
            id: id,
            status: verification
        }
        const response = await axios.post('api/doctor',payload);
        if(response.status === 200) {
            alert('updated successfully');
            fetchData();
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>S.N</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>NMC</TableCell>
                        <TableCell>NMC Image</TableCell>
                        <TableCell>Citizenship</TableCell>
                        <TableCell>Citizenship Image</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((user) => (
                        <TableRow key={user.doctorId}>
                            <TableCell>{user.sn}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>{user.nmc_no}</TableCell>
                            <TableCell><img src={user.nmc_certificate} alt="NMC Image" style={{ width: 50 }} /></TableCell>
                            <TableCell>{user.citizenship}</TableCell>
                            <TableCell><img src={user.citizenship_id} alt="citizenship Image" style={{ width: 50 }} /></TableCell>
                            <TableCell>
                                <Select
                                    value={user.verified}
                                    onChange={(event) => handleStatusChange(event, user.doctorId)}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="verified">Verified</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminVerificationPage;
