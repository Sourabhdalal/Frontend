import React from 'react';
import 'remixicon/fonts/remixicon.css';
import '../css/DisplayPage.css';
//npm i remixicon or npm install remixicon
const Header = () => (
  <div className="header">
    <div className="content">
      <h1>
        <span>Get Quick</span>
        <br />
        Medical Services
      </h1>
      <p>
        In today's fast-paced world, access to prompt and efficient medical
        services is of paramount importance. When faced with a medical
        emergency or seeking immediate medical attention, the ability to
        receive quick medical visit can significantly impact the outcome
        of a situation.
      </p>
      
    </div>
    <div className="image">
      <span className="image__bg"></span>
      <img src={require("../assets/header-bg.png")} alt="Header background" />
      <div className="image__content image__content__1">
        {/* <span>
          <i className="ri-user-3-line"></i>
        </span> */}
        <div className="details">
          <h4>Book Your</h4>
          <h4>Appointment</h4>
        </div>
      </div>
      <div className="image__content image__content__2">
        <ul>
          <li>
            <span>
              <i className="ri-check-line"></i>
            </span>
            Allopathy
          </li>
          <li>
            <span>
              <i className="ri-check-line"></i>
            </span>
            Homeopathy
          </li>
          <li>
            <span>
              <i className="ri-check-line"></i>
            </span>
            Ayurveda
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ image, name, feedback }) => (
  <div className="testimonial-card">
    <img src={image} alt={name} />
    <h4>{name}</h4>
    <p>{feedback}</p>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      image: 'https://media.licdn.com/dms/image/D5603AQFZm2tVAgo2UA/profile-displayphoto-shrink_200_200/0/1674715010470?e=2147483647&v=beta&t=4IVX2UJvbBYUs2-1ZJ10HGa3xpKE6jOCQNXgqaafcnY',
      name: 'Mr. Saurabh',
      feedback: 'The Doctor-on-call has been a game changer for me. I no longer have to take time off work or spend hours waiting in a clinic to book an appointment. With just a few clicks, I can easily view the availability of doctors and schedule an appointment that fits my schedule. '
    },
    {
      image: 'https://media.licdn.com/dms/image/D5603AQGbmYOVeUFb1w/profile-displayphoto-shrink_800_800/0/1666279090507?e=2147483647&v=beta&t=y7nDvpwvo3J85R-wJBEiBeFvA4__YMf9UHiUfuvCNFE',
      name: 'Mr. Usama',
      feedback: 'I recently moved to a new city and was struggling to find a new primary care physician. The Doctor-on-call made it easy for me to search for doctors in my area and book an appointment.'
    },
    {
      image: 'https://media.licdn.com/dms/image/C4D03AQFo4ppbWn5inA/profile-displayphoto-shrink_400_400/0/1633321794827?e=2147483647&v=beta&t=iaM-H762_zkdoFKJKXThR21W212dbusxV9urEkKLVjg',
      name: 'Mr. Harsh',
      feedback: 'As a busy person, it can be challenging to find time to book doctor appointments for myself. The Doctor-on-call has been a lifesaver for me.'
    },
    {
      image: 'https://avatars.githubusercontent.com/u/141249272?v=4',
      name: 'Mr. Rushikesh',
      feedback: 'Efficient and user-friendly, this streamlines healthcare access. With time availability, reminders, and secure medical record access, it simplifies appointment booking and enhances patient-doctor communication.'
    },
    {
      image: 'https://avatars.githubusercontent.com/u/128772786?v=4',
      name: 'Mr. Chetan',
      feedback: 'This is a game-changer for healthcare access. Easy booking, real-time availability, and secure medical records access make it a must-have. Telemedicine adds convenience. Simplify scheduling and stay on top of your health'
    }

  ];

  return (
    <div className="testimonials">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard {...testimonial} key={index} />
      ))}
    </div>
  );
};

const NHome = () => (
  <div className="container">
    <Header />
    <br/>
    <br/>
    <h2>Testimonials</h2>
    <Testimonials />
  </div>
);

export default NHome;