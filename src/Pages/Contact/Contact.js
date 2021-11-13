import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';

const Contact = () => {
    return (
        <div>
            <Navigation></Navigation>
            <h1 className="my-4">Contact us</h1>
            <div className="container">
                <input className="form-control my-2" type="text" placeholder="Your Email" required />
                <input className="form-control" type="text" placeholder="Subject" />
                <textarea className="form-control my-2" style={{ height: '250px' }} placeholder="Leave your message here" id="floatingTextarea"></textarea>
            </div>
            <button className="btn btn-lg btn-outline-success mt-3">Subimt</button>

            <Footer></Footer>
        </div>
    );
};

export default Contact;