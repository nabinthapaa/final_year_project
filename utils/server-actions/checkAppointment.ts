import { ConnectToDB }  from "../../libs/connectToDB";
import User from "../../models/User";

export async function checkAppointment(id: string): Promise<boolean> {
    await ConnectToDB();
    const appointment = User.find({userId: id, status:"booked"}).lean();
    if(!appointment) return true;
    return false;
}
