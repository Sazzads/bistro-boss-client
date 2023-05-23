import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import feauredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white  my-20 '>
            <div className='bg-slate-900 bg-opacity-50 pt-8'>
            <SectionTitle heading={"FEAchered items"}
                subHeading={"---check it out---"}></SectionTitle>
            </div>
            <div className='md:flex justify-center bg-slate-900 bg-opacity-50 items-center pb-20 pt-12 px-36 '>
                <div>
                    <img src={feauredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20,2029</p>
                    <p className='uppercase'>where can i get soe?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quibusdam asperiores similique repudiandae commodi id architecto fugiat, odit dolorem adipisci tenetur voluptas numquam consequuntur laborum repellat quasi molestiae, iusto obcaecati! Facere optio maxime qui ipsam quam dignissimos ipsa rem adipisci rerum debitis, officiis, minus quidem? Perferendis ab voluptatum quidem similique?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;