import React, { useState } from 'react';
import './Contact.css';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import { toast } from 'react-toastify';


import {backendUrl} from '../../config';
const Contact = () => {
  const[name, setName]=useState("");
  const[email, setEmail]=useState("");
  const[contact, setContact]=useState("");
  const[message, setMessage]=useState("");
  
  const handleSubmit=async(e) =>{
    e.preventDefault();
    try{
      const { data } = await axios.post(`${backendUrl}/contact`, { name, email, contact, message });

    toast.success("Thanks for sharing!")
  }
  catch(err){
    toast.error(err.response.data);
  }
  }

  return (
    <div class="contact_us_green">
  <div class="responsive-container-block big-container">
    <div class="responsive-container-block container">
      <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" id="i69b-2">
        <form onSubmit={handleSubmit} class="form-box">
          <div class="container-block form-wrapper">
            <div class="responsive-container-block">
              <div class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-12" id="i10mt-6">
                <input class="input" onChange={(e) => setName(e.target.value)} id="ijowk-6" name="name" placeholder="Name" />
              </div>
              <div class="responsive-cell-block wk-desk-12 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                <input class="input" onChange={(e) => setEmail(e.target.value)} id="ipmgh-6" name="email" placeholder="Email" />
              </div>
              <div class="responsive-cell-block wk-desk-12 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                <input class="input" onChange={(e) => setContact(e.target.value)} id="imgis-5" name="contact" type="number" placeholder="Contact No." />
              </div>
              <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-6">
                <textarea class="textinput" onChange={(e) => setMessage(e.target.value)} id="i5vyy-6" name="message" placeholder="Message"></textarea>
              </div>
            </div>
            <div class="btn-wrapper">
              <button class="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10" id="ifgi">
        <div class="container-box">
          <div class="text-content">
            <p class="text-blk contactus-head">
              Contact Information
            </p>
          </div>
          <div class="workik-contact-bigbox">
            <div class="workik-contact-box">
            <div class="mail text-box">
            <p class="icon"><MDBIcon icon="envelope" size="2x" /> </p>
              <p class="contact-text">
              support@geneussolutions.in
              </p>
            </div>
            <div class="phone text-box">
            <p class="icon"><MDBIcon icon="phone" size="2x" /> </p>
              <p class="contact-text">
                +91 9148950239

              </p>
            </div>
            </div>
            <h3>Follow Us</h3>
            <div class="social-media-links">
              <a href="https://www.facebook.com/geneus.solutions">
              <MDBIcon fab icon="facebook" size="2x" />
              </a>
              <a href="https://www.instagram.com/geneus.solutions/">
              <MDBIcon fab icon="instagram" size="2x" />
              </a>
              <a href="#linkedin">
              <MDBIcon fab icon="linkedin" size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
export default Contact;

