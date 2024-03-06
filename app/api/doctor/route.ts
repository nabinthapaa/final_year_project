import {NextRequest, NextResponse} from "next/server";
import {ConnectToDB} from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const {id,status} = await req.json();
        await ConnectToDB();
        await Doctor.findOneAndUpdate({doctorId: id},{verified: status});
        return NextResponse.json({
            message: 'Succesfully Updated',
            status: 200
        })
    }catch (e: any) {
        return NextResponse.json({
            status: 400,
            message: "Error updating doctor"
        })
    }
}
