import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  // This connects your form to https://formspree.io/f/myknggna
  const [state, handleSubmit] = useForm("myknggna");

  if (state.succeeded) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ color: 'var(--accent3)' }}>✅ Message Sent!</h2>
          <p className="muted">Thanks for reaching out, Alberto will get back to you soon.</p>
          <button className="btnPrimary" onClick={() => window.location.reload()}>Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="pageHead">
        <h2>Contact</h2>
        <p className="muted">Send a message directly to my email regarding operations or leadership roles.</p>
      </div>

      <div className="contactWrap">
        <div className="card">
          <h3 className="cardTitle">Direct</h3>
          <div className="kv"><span className="k">Email</span><span className="v">alberto.banos@yahoo.com</span></div>
          <div className="kv"><span className="k">Location</span><span className="v">New York, NY</span></div>
        </div>

        <div className="card">
          <h3 className="cardTitle">Send a message</h3>
          {/* handleSubmit handles the "POST" to Formspree automatically */}
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formGrid">
              <label htmlFor="name"><span>Name</span>
                <input id="name" name="name" required />
              </label>

              <label htmlFor="email"><span>Email</span>
                <input id="email" type="email" name="email" required />
              </label>
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <label htmlFor="message"><span>Message</span>
              <textarea id="message" name="message" rows={7} required />
            </label>
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <button className="btnPrimary" type="submit" disabled={state.submitting}>
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}