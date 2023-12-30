import "./Contact.css";
import send from "../../assets/images/send.png";
export default function Contact() {
  return (
    <div className="contact-parent">
      <form className="contact-form">
        <input type="text" placeholder="Name" className="contact-name" />
        <textarea
          cols="50"
          rows="5"
          className="contact-text-area"
          placeholder="Enter your message here..."
        />
        <div className="send-btn-parent">
          <button className="contact-send-btn">
            <img src={send} />
          </button>
        </div>
      </form>
    </div>
  );
}
