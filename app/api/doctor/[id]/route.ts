import {ConnectToDB} from "@/libs/connectToDB";
import {NextRequest, NextResponse} from "next/server";
import Doctor from "@/models/Doctor";

export async function GET(req: Request, { params }: {params: {id: number}}){
    try{
        const {id} = params;
        await ConnectToDB();
        const user = await Doctor.findOne({doctorId: id});
        if(!user) return NextResponse.json({
            message: 'Doctor not found'
        })
        const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        const payload = {
            email: user.email,
            userId: user.userId,
            image: user.image,
            firstName: firstName,
            lastName: lastName,
            verified: user.verified
        }
        return NextResponse.json({
            data: payload,
            status: 401
        })
    }
    catch (error) {
        console.log('error',error)
        return NextResponse.json({
                body: error
            }
        )
    }
}

