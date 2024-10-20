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
    return (
        <div className={`hover:scale-110 w-64 h-44 ${background} rounded-md flex flex-col items-center justify-center py-4 px-5 border-b-8 ${borderColor} m-3`}>
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
                    {status}%
                </div>
            </div>
        </div>);
}