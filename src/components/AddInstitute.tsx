'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Toaster, toast } from 'sonner'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function AddInstitute() {
    const {user} = useKindeBrowserClient();
    const [formData, setFormData] = useState({
        instituteName: '',
        instituteAddress: '',
        instituteCode: '',
    })

    const handleSubmit = async () => {
        // console.log(formData);
        const sendData = {...formData, userAuthId: user?.id};
        try {
            const res = await fetch('/api/institute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Metadata': JSON.stringify(sendData)
                }
            });
            const data = await res.json();
            if (data.success) {
                toast.success(`${formData.instituteName} Successfully Registered!`);
            }
            else {
                toast.error("Can't Register Institute!");
            }
        }
        catch (error) {
            console.error("Can't make API Call");
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Toaster/>
            <Card className="w-2/5">
                <CardHeader>
                    <CardTitle>Institute Details</CardTitle>
                    <CardDescription>Add your institution details here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label>Institute Name</Label>
                                <Input value={formData.instituteName} onChange={(e) => setFormData({...formData, instituteName: e.target.value})} id="name" placeholder="Name of your institute" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Institute Address</Label>
                                <Textarea value={formData.instituteAddress} onChange={(e) => setFormData({...formData, instituteAddress: e.target.value})} id="name" placeholder="Enter your institute address" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label>Institute Code</Label>
                                <Input value={formData.instituteCode} onChange={(e) => setFormData({...formData, instituteCode: e.target.value})} id="name" placeholder="Enter your institute code" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    )
}