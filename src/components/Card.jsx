import { useNavigate } from "react-router-dom";

export default function Card({ 
    children,
    borderColor="border-error", 
    titleText = 'Card', 
    quantity = 50, 
    status = 75 , 
    background="bg-primary", 
    fontColor="text-white",
    dividerColor="bg-black" 
}) {
    const navigator = useNavigate();

    function onCardClick(){
        navigator(`/dashboard?status=${titleText}`);
    }
    return (
        <div className={`hover:scale-110 w-64 h-44 ${background} rounded-md flex flex-col items-center justify-center py-4 px-5 border-b-8 ${borderColor} m-3`} onClick={onCardClick}>
            <div className="text-black text-2xl">
                {children} <span>{titleText}</span>
            </div>
            <div className={`divider ${dividerColor} h-0.5  mx-4 rounded-md`}>
            </div>
            <div className="flex  space-around items-center gap-[1rem]">
                <div className={`text-4xl font-semibold ${fontColor}`}>
                    {quantity}
                </div>
                <div
                    className={`radial-progress text-xl ${fontColor}`}
                    style={{ "--value": 70 }}
                    role="progressbar">
                    {status.toString().substring(0,5)}%
                </div>
            </div>
        </div>);
}