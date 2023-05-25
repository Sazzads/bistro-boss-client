import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const ChefRecomand = () => {
    const [recommand, setRecommand] = useState([])
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const recomandItems = data.filter(item => item.category === 'popular')
                setRecommand(recomandItems)
            })
    }, [])
    const displayeFood = recommand.slice(0, 3)
    // console.log(displayeFood);

    return (
        <div className='my-10'>
            <SectionTitle heading={"CHEF RECOMMENDS"}
                subHeading={"---Should Try---"}></SectionTitle>
            <div className='grid md:grid-cols-3'>
                {
                    displayeFood.map(food => <div key={food._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={food?.image} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{food?.name}</h2>
                            <p>{food?.recipe}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Add TO Cart</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>


        </div>
    );
};

export default ChefRecomand;