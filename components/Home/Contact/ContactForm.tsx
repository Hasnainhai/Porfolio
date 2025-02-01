/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from "react";
import emailjs from "@emailjs/browser"; // Make sure to install and import emailjs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null); // Specify the type for useRef

  const validateForm = (formData: FormData): boolean => {
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const serviceName = formData.get("service_name") as string;
    const message = formData.get("message") as string;

    // Check if required fields are empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !serviceName ||
      !message
    ) {
      toast.error("All fields are required!");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\d{10,}$/; // Assumes a 10-digit phone number
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number!");
      return false;
    }

    return true;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const formData = new FormData(form.current);

      // Validate form inputs
      if (!validateForm(formData)) {
        return; // Stop if validation fails
      }

      // hasnain plz replace with your ids 
      emailjs
        .sendForm(
          "service_sqce9kh", // replace service-id
          "template_0j1l8y4", //replace template_id
          form.current,
          {
            publicKey: "gfyJIBoe7BUx8Q5WK", //replace Public_key
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
            toast.success("Email sent successfully!");
            form.current?.reset(); // Reset the form after successful submission
          },
          (error) => {
            console.log("FAILED...", error.text);
            toast.error("Failed to send email!");
          }
        );
    }
  };

  return (
    <div className="bg-[#140c1c] rounded-lg p-4 sm:p-10">
      <h1 className="text-bg text-2xl md:text-3xl lg:text-[2.5rem] font-bold">
        Let's work together!
      </h1>
      <p className="text-gray-200 mt-3 lg:text-base text-xs md:text-sm">
        Transform your ideas into reality with innovative solutions tailored to
        your needs.
      </p>
      {/* input fields */}
      <form
        className="mt-8 block w-full overflow-hidden"
        ref={form}
        onSubmit={sendEmail}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="First name"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
            name="first_name"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
            name="last_name"
            required
          />
        </div>
        <div className="flex mt-5 flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
            name="email"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
            name="phone"
            required
          />
        </div>
        <div>
          <select
            className="w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none"
            name="service_name"
            defaultValue="null" // Use defaultValue instead of selected
            required
          >
            <option value="null" disabled>
              Select an option
            </option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
            <option value="fullstack">Fullstack Development</option>
          </select>
        </div>
        <textarea
          className="w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none"
          rows={7}
          placeholder="Message"
          name="message"
          required
        ></textarea>
        <div className="mt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#7947df] text-white hover:bg-[#5c2fb7] transition-all duration-150 rounded-full"
          >
            Send Message
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
