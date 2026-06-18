import {Header} from "@/components/layout/header/Header";
import {TopMenu} from "@/components/layout/top-menu/TopMenu";
import Image from "next/image";
import {Slider} from "@/pages/home/slider/Slider";

export default function Home() {
    return (
        <div className='container mx-auto'>
            <Header/>
            <TopMenu/>
            <Image className='mx-auto mt-3' src='/banner.png' alt='banner' width={2400} height={137}/>
            <Slider/>
        </div>
    );
}
