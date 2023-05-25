import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import bgImg from '../../../assets/home/chef-service.jpg'
import PopularMenu from '../PopularMenu/PopularMenu';
import ChefRecomand from '../ChefRecomand/ChefRecomand';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet, HelmetData } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${bgImg})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content bg-white text-black">
                        <div className="max-w-screen-lg py-24 text-black">
                            <h1 className="mb-5 text-5xl font-bold">Bistro Boss</h1>
                            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                        </div>
                    </div>
                </div>
                <PopularMenu></PopularMenu>
                <div>
                    <div className='bg-black h-[250px] flex items-center justify-center my-10'>
                        <h3 className='  text-white text-4xl'>Call Us: +88 0192345678910</h3>
                    </div>
                </div>
                <ChefRecomand></ChefRecomand>
                <Featured></Featured>
                <Testimonials></Testimonials>
            </div>
    );
};

export default Home;