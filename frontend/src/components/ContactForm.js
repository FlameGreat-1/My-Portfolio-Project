import React, { useRef, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbLoader3 } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      formData.full_name.trim() !== '' &&
      emailRegex.test(formData.email_address) &&
      formData.message.trim() !== '' &&
      token !== null
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      full_name: '',
      email_address: '',
      message: '',
    });
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
    }
    setToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post('/api/proxy/api/contact/', {
        ...formData,
        captcha_token: token
      });

      if (response.data.success) {
        toast.success(response.data.message, {
          progressStyle: { background: '#FFC254' },
          style: { color: '#121212' },
          icon: <GrStatusGood className="text-xl" />,
        });
        clearForm();
      } else {
        console.log("Error", response.data);
        toast.error(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to send message. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }

    setIsLoading(false);
  };

  return (
    <section className="flex flex-col gap-5">
      <ToastContainer />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-[28px] font-bold text-litewhite" data-aos="fade-down">
          Contact Form
        </h1>
        <div className="bg-vegas-gold h-[5px] w-[60px] rounded-full" data-aos="fade-down"></div>
      </div>

      <form onSubmit={handleSubmit} className='text-[14px] md:text-[16px]'>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-0 md:gap-5">
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="input shadow-sm shadow-jet"
            required
            data-aos="fade-down"
            aria-label="Full Name"
          />
          <input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="input shadow-sm shadow-jet"
            required
            data-aos="fade-down"
            aria-label="Email Address"
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          cols={20}
          rows={10}
          placeholder="Your Message"
          className="input shadow-sm shadow-jet"
          required
          data-aos="fade-down"
          aria-label="Your Message"
        />

        <div className="flex items-end justify-end" data-aos="fade-up">
          <HCaptcha
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={setToken}
            ref={captchaRef}
            theme="dark"
            size="normal"
            data-theme-dark="{'background':'#000000','accent':'#FFC300'}"
            data-theme-light="{'background':'#FFFFFF','accent':'#FF5722'}"
            data-captcha-idle-timeout="60"
          />
        </div>

        <div className="flex items-end justify-end mt-5" data-aos="fade-up">
          <button
            type="submit"
            className={`py-3 px-5 flex items-center gap-2 text-vegas-gold text-[15px] font-bold bg-smoky-black border border-jet border-solid shadow-sm shadow-vegas-gold rounded-xl button ${!isFormValid() && 'opacity-50 cursor-not-allowed shadow-sm shadow-jet button'
              }`}
            disabled={!isFormValid()}
            aria-label="Send Message"
          >
            {isLoading ? <TbLoader3 className="animate-spin text-2xl" /> : <IoIosSend className="text-2xl" />}
            {"Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
