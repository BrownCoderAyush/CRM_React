import { BsFillPencilFill } from "react-icons/bs";

import Card from "../components/Card";
import HomeLayout from "../layouts/HomeLayout";



export default function Home() {


    return (
        <HomeLayout>
            <Card>
                <BsFillPencilFill className="inline " />
            </Card>
            <Card
                background="bg-yellow-300"
                borderColor="border-green-300"
                fontColor="text-black"
                dividerColor="bg-black"
                status={30}
            >
                <BsFillPencilFill className="inline " />
            </Card>
        </HomeLayout>
    );
}