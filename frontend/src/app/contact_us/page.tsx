"use client"

import "./contact_us.css"

import Link from "next/link";
import React from 'react'
import emailjs from 'emailjs-com';
import { useEffect } from 'react';

function contact_us() {

    const email = "rahulgavane607@gmail.com";
    const address = "5687+athani+savalagi+Road,+Kokatnoor,+sugar+factory,+591-304";
    const googleMapsUrl = `https://www.google.com/maps/place/${address}`;


    useEffect(() => {
        const inputFields = document.querySelectorAll(".input-box input, .input-box textarea");

        inputFields.forEach((input) => {
            input.addEventListener("input", function (event) {
                const inputValue = event.target.value.trim();

                if (inputValue !== "") {
                    input.classList.add("has-value");
                } else {
                    input.classList.remove("has-value");
                }
            });

            if (input.value.trim() !== "") {
                input.classList.add("has-value");
            }
        });
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();

        const form = document.getElementById('contact-form');

        emailjs.sendForm('service_iy9arjo', 'template_5jbihcn', form, 'n8-tNZc75wfGzCykH')
            .then((result) => {
                console.log(result.text);
                // Additional logic on successful submission, e.g., show a success message
                form.reset();
            })
            .catch((error) => {
                alert("sent")
                console.log(error.text);
                // Additional logic on submission failure, e.g., show an error message
            });
    };

    return (
        <div className='bodypage'>

            <section>

                <div className="section-header">
                    <div className="container">
                        <h2>Contact Us</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">

                        <div className="contact-info">
                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <i className="fas fa-home"></i>
                                </div>

                                <div className="contact-info-content">
                                    <h4>Address</h4>
                                    <p>
                                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', cursor: 'pointer', textDecoration: 'underline' }}>
                                            5687 athani savalagi Road,<br /> Kokatnoor,Renuka sugars limited, <br />591-304
                                        </a>

                                    </p>              
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <i className="fas fa-phone"></i>
                                </div>

                                <div className="contact-info-content ">
                                    <h4>Phone</h4>
                                    <p>
                                        <Link href="tel:+18105356165">
                                            810-535-6165
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="contact-info-item ">
                                <div className="contact-info-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>

                                <div className="contact-info-content">
                                    <h4>Email</h4>
                                    <p>
                                        <Link href={`mailto:${email}`} style={{ color: 'white' }}>
                                            {email}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form">
                            <form action="" id="contact-form" onSubmit={sendEmail}>
                                <h2>Send Message</h2>
                                <div className="input-box">
                                    <input type="text" required name="name"></input>
                                    <span>Full Name</span>
                                </div>

                                <div className="input-box">
                                    <input type="email" required name="email"></input>
                                    <span>Email</span>
                                </div>

                                <div className="input-box">
                                    <textarea required name="message"></textarea>
                                    <span>Type your Message...</span>
                                </div>

                                <div className="input-box">
                                    <input type="submit" value="Send" name="send"></input>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default contact_us