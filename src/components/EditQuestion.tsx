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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditQuestion(){
    return(
        <div className="flex justify-center">
            <Card className="w-2/5">
                <CardHeader>
                    <CardTitle>Edit Questions</CardTitle>
                    <CardDescription>Edit the questions here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Select question number</Label>
                            <Select>
                                <SelectTrigger id="option">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent defaultValue={`Option 1`} position="popper">
                                    <SelectItem value={`option1`}>question 1</SelectItem>
                                    <SelectItem value={`option2`}>question 2</SelectItem>
                                    <SelectItem value={`option3`}>question 3</SelectItem>
                                    <SelectItem value={`option4`}>question 4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Question title</Label>
                            <Input id="name" placeholder="Edit question title" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 1</Label>
                            <Input id="name" placeholder="Edit Option 2" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 2</Label>
                            <Input id="name" placeholder="Edit Option 2" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 3</Label>
                            <Input id="name" placeholder="Edit Option 3" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Option 4</Label>
                            <Input id="name" placeholder="Edit Option 4" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Correct Answer</Label>
                            <Select>
                                <SelectTrigger id="option">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent defaultValue={`Option 1`} position="popper">
                                    <SelectItem value={`option1`}>Option 1</SelectItem>
                                    <SelectItem value={`option2`}>Option 2</SelectItem>
                                    <SelectItem value={`option3`}>Option 3</SelectItem>
                                    <SelectItem value={`option4`}>Option 4</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
    )
}