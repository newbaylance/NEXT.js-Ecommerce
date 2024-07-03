import Card from "@/components/Card";

export default function Products() {
    return(
        <div className="container mx-auto px-4 mt-10 mb-10">
        <div className="flex ...">
        <div className="flex-auto w-25 ...">
            <div className="join">
            <div>
                <div>
                <input className="input input-bordered join-item" placeholder="Search" />
                </div>
            </div>
            <div className="indicator">
                <button className="btn join-item">Search</button>
            </div>
            </div>
        </div>
        <div className="flex-auto w-75 ...">
            <div className="grid grid-cols-2 gap-4">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
        </div>
        </div>
    )
}