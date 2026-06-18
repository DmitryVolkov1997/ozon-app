'use client'
import {useState} from "react";
import {SLIDES} from "@/pages/home/slider/slider.data";
import Image from "next/image";
import cn from "clsx";
import {ArrowLeft, ArrowRight} from "lucide-react";

export const Slider = () => {
    const [activeSlideId, setActiveSlideId] = useState(1)

    return (
        <div className='relative h-75 overflow-hidden rounded-2xl mt-5'>
            {SLIDES.map((slide) => {
                const isActive = activeSlideId === slide.id

                return (
                    <div
                        key={slide.id}
                        className={cn(
                            "absolute inset-0 transition-transform duration-500 ease-in-out",
                            isActive ? "translate-x-0 z-10" : "translate-x-full z-0"
                        )}
                    >
                        <Image
                            src={slide.image}
                            alt="slide"
                            fill
                            className="object-cover rounded-2xl"
                            draggable={false}
                        />
                    </div>
                )
            })}

            <div className='absolute z-30 top-1/2 -translate-y-1/2 flex justify-between w-full px-4'>
                <button className='bg-white/50 hover:bg-white/75 transition-all p-1.5 rounded-md'
                        onClick={() => setActiveSlideId(activeSlideId === 1 ? SLIDES.length : activeSlideId - 1)}>
                    <ArrowLeft size={20}/>
                </button>

                <button className='bg-white/50 hover:bg-white/75 transition-all p-1.5 rounded-md'
                        onClick={() => setActiveSlideId(activeSlideId === SLIDES.length ? 1 : activeSlideId + 1)}>
                    <ArrowRight size={20}/>
                </button>
            </div>

            <div
                className='absolute z-10 bottom-0 left-1/2 translate-y-[-50%] flex justify-center items-center gap-x-1'>
                {
                    SLIDES.map((slide) => (
                        <button
                            key={slide.id}
                            className='p-1'
                            onClick={() => setActiveSlideId(slide.id)}>
                            <div
                                className={cn('w-3 h-3  rounded-full', activeSlideId === slide.id ? 'bg-white/60' : 'bg-white/20')}></div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};
