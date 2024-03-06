import React from 'react'
import ShowImage from './ShowImage';

/*
 * [
  {
    _id: new ObjectId('65e89ac1ff908b813a7f8149'),
    firstName: 'Abishek ',
    lastName: 'Mahato',
    email: 'abi@gmail.com',
    age: 45,
    image: 'https://res.cloudinary.com/dhcyfsp1q/image/upload/v1709742756/cb83e6b1-7125-416d-be1f-684037015d9b.jpg',
    address: 'TOkha, Gwarko',
    gender: 'male',
    qualification: 'MBBS',
    specialization: 'Cardiologist',
    experience: 10,
    department: 'Cardio',
    createdAt: 2024-03-06T16:33:05.927Z,
    updatedAt: 2024-03-06T16:33:07.082Z,
    __v: 0,
    doc_id: new ObjectId('65e89ac2ff908b813a7f814d'),
    docs: {
      _id: new ObjectId('65e89ac2ff908b813a7f814d'),
      citizenship: 8768965432,
      citizenship_id: 'https://res.cloudinary.com/dhcyfsp1q/image/upload/v1709742772/cbcd91e4-04c8-4ed1-a687-1e3b3964df1b.jpg',
      nmc_no: 1470,
      nmc_certificate: 'https://res.cloudinary.com/dhcyfsp1q/image/upload/v1709742784/eaec3d98-20d3-4d15-939a-f2df424e6dde.jpg',
      doctorId: new ObjectId('65e89ac1ff908b813a7f8149'),
      createdAt: 2024-03-06T16:33:06.903Z,
      updatedAt: 2024-03-06T16:33:06.903Z,
      __v: 0
    }
  }
]

 */

export default function DoctorTable({ data }: any) {
    console.log(data);
    return data.map((d:any, i:any) => <Table key={d._id} index={i} data={d} />)
}


function Table({ data, index }: any) {
    return (
        <div className='doctor-table text-text'>
            <span className='sn'>{index + 1}</span>
            <span className='name'>{data.firstName} {data.lastName}</span>
            <span className='email'>{data.email}</span>
            <ShowImage source={data.docs.nmc_certificate} class_="nmc" />
            <ShowImage source={data.docs.citizenship_id}  class_="citi"/>
            <span className='verification'>{data.verified ? "Verified" : "Pending"}</span>
        </div>
    )
}
