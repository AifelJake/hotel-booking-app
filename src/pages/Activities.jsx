import React from 'react'

import actOne from "../assets/img/actOne.jpg"
import actTwo from "../assets/img/actTwo.jpeg"
import actThree from "../assets/img/actThree.jpg"
import actFour from "../assets/img/actFour.jpg"
import actFive from "../assets/img/actFive.jpg"
import actSix from "../assets/img/actSix.jpg"

const Activities = () => {



    return (
        <div className='px-[10rem] pt-10 mt-12'>
            {/* 1st column */}
            <div className='flex justify-evenly mb-10'>
                <img src={actOne} className='h-[35rem] w-[30%]' alt="" />
                <img src={actTwo} className='h-[35rem] w-[30%]' alt="" />
                <img src={actThree} className='h-[35rem] w-[30%]' alt="" />
            </div>

            {/* 2nd column */}
            <div className='flex justify-evenly'>
                <img src={actFour} className='h-[35rem] w-[30%]' alt="" />
                <img src={actFive} className='h-[35rem] w-[30%]' alt="" />
                <img src={actSix} className='h-[35rem] w-[30%]' alt="" />
            </div>
        </div>
    )
}

export default Activities