import HeaderButton from "@/components/HeaderButton";

export default function Home() {
    return (
        <div className="relative back-image h-full">
            <div className="absolute flex justify-center items-center bg-over-cover w-full h-full pt-16">
                <div className="text-center">
                    <div className="font-bold text-4xl text-white mb-6">Welcome To Platform</div>
                    <HeaderButton>Get Started</HeaderButton>
                </div>
            </div>
        </div>
    )
}