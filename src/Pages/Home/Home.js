import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import Banner from './Banner';
import BestSell from './BestSell';
import Feedback from './Feedback';
import News from './News';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <BestSell></BestSell>
            <Feedback></Feedback>
            <News></News>
            <Footer></Footer>
        </div>
    );
};

export default Home;