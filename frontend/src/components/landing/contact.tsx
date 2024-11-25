import React from "react";    // , { useState, ChangeEvent, FormEvent } 
import '../../assets/scss/landing/contact.scss';
import { RiFacebookLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandGithub } from "react-icons/tb";

// 데이터 타입 정의
interface ContactData {
  data: {
    address: string;
    phone: string;
    email: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
}

/*const initialState = {
  name: "",
  email: "",
  message: "",
};*/

export const Contact: React.FC<ContactData> = ({ data }) => {
  /*const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, message);

    // 이메일 보내기 로직 추가 (예시)
    // emailjs.sendForm(...);
  };
  */

  return (
    <div>
      <div id="contact" className="contact">
        <div className="social-container">
          {/*<div className="col-md-8">
            <div className="row">
              <div className={styles.sectionTitle}>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.formControl}
                        placeholder="Name"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={styles.formGroup}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.formControl}
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    name="message"
                    id="message"
                    className={styles.formControl}
                    rows={4}
                    placeholder="Message"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div id="success"></div>
                <button type="submit" className={styles.btnCustom}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className={styles.contactItem}>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {data?.address || "loading"}
              </p>
            </div>
            <div className={styles.contactItem}>
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {data?.phone || "loading"}
              </p>
            </div>
            <div className={styles.contactItem}>
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {data?.email || "loading"}
              </p>
            </div>
          </div>*/}
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={data?.facebook || "#"}>
                    <RiFacebookLine className="social-icon" size={48} color="white"/>
                    </a>
                  </li>
                  <li>
                    <a href={data?.twitter || "#"}>
                    <FaXTwitter className="social-icon" size={48} color="white"/>
                    </a>
                  </li>
                  <li>
                    <a href={data?.youtube || "#"}>
                    <TbBrandGithub className="social-icon" size={48} color="white"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="social-container text-center">
          <p>
            &copy; 2023 Issaaf Kattan React Landing Page Template. Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
