import {getServerSession, Session} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProfileCard from "./components/ProfileCard";
import axios from "axios";

async function Profile() {

    const session: any = await getServerSession(authOptions);
    let id;
    let data;
    if(session && session.user){
        id = session.user.id
        const userDetail =  await axios.get(`${process.env.BASE_URL}/api/user/${id}`);
        data = userDetail.data.data;
    }else if(session && session.doctor){
        id = session.doctor.id
        const doctorDetail =  await axios.get(`${process.env.BASE_URL}/api/doctor/${id}`);
        data = doctorDetail.data.data;
    }

    // console.log(`========= [USER DETAILS] ========`)
    // console.log(data)
    // console.log("=================================")


    return (
        <div className="text-white">
            { data ? <ProfileCard data={data} /> : ''}
        </div>
    );
}

export default Profile;
