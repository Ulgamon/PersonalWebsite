import useInput from "@/hooks/useInput";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  IoMailOpenOutline,
  IoWarningOutline,
  IoLogoGithub,
  IoMail,
  IoPhonePortraitOutline,
  IoLogoLinkedin,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Element } from "react-scroll";
import Lottie from "lottie-react";
import animation from "../../assets/animations/Check.json";
import ContactLink from "../contact-link/ContactLink";

const URL = "https://formsubmit.co/ajax/ilicjustin@gmail.com";

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const {
    blurInputHandler: blurNameInputHandler,
    changeInputHandler: changeNameInputHandler,
    enteredValue: name,
    invalidInput: nameInvalidInput,
    valueIsValid: nameIsValid,
    reset: resetName,
  } = useInput((value) => (value.trim() ? true : false));

  const {
    blurInputHandler: blurEmailInputHandler,
    changeInputHandler: changeEmailInputHandler,
    enteredValue: email,
    invalidInput: emailInvalidInput,
    valueIsValid: emailIsValid,
    reset: resetEmail,
  } = useInput((value) => (value.trim() ? true : false));

  const {
    blurInputHandler: blurMessageInputHandler,
    changeInputHandler: changeMessageInputHandler,
    enteredValue: message,
    invalidInput: messageInvalidInput,
    valueIsValid: messageIsValid,
    reset: resetMessage,
  } = useInput((value) => (value.trim() ? true : false));

  const canSubmitForm = nameIsValid && emailIsValid && messageIsValid;

  const sendEmail = async (name: string, email: string, message: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: name, email: email, message: message }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      console.log(data, "Data from inside the sendEmail function.");
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    setError(false);
    event.preventDefault();
    if (!canSubmitForm) {
      blurNameInputHandler();
      blurEmailInputHandler();
      blurMessageInputHandler();
      return;
    }
    const data = await sendEmail(name, email, message);
    console.log(data, "from inside the submithandler", error);
    if (data?.success === "false") {
      setError(true);
      return;
    }
    if (error === false) setMessageSent(true);
    resetName();
    resetEmail();
    resetMessage();
    // setSuccessMessage("Thank you for your email :).");
  };

  // setMessage
  const toggleMessageSent = () => {
    setMessageSent((prevState) => !prevState);
  };

  return (
    <Element name="contact">
      <h3 className="text-5xl font-bold text-center mb-10">Contact</h3>
      <ul className="grid sm:grid-cols-2 gap-2 lg:gap-5 max-w-[500px] md:grid-cols-4 md:max-w-[900px] mx-auto px-16 mb-12">
        <ContactLink text="Ulgamon" to="https://github.com/Ulgamon">
          <IoLogoGithub />
        </ContactLink>
        <ContactLink
          text="ilicjustin@gmail.com"
          to="mailto://ilicjustin@gmail.com"
        >
          <IoMail />
        </ContactLink>
        <ContactLink text="+381642143238" to="tel://+381642143238">
          <IoPhonePortraitOutline />
        </ContactLink>
        <ContactLink
          text="LinkedIn"
          to="https://www.linkedin.com/in/justin-ilic/"
        >
          <IoLogoLinkedin />
        </ContactLink>
      </ul>
      <section id="contact" className="mb-10">
        <Card className="md:mx-16 overflow-clip bg-orange-300 dark:bg-sky-300 flex flex-row shadow-none border-0">
          <div className="hidden md:flex justify-center items-center md:w-1/2">
            <IoMailOpenOutline
              className={
                "text-7xl dark:text-orange-500 " +
                (messageSent ? "" : "animate-bounce")
              }
            />
          </div>
          <Card className="w-full md:w-1/2 overflow-clip md:max-w-[700px] mx-auto">
            {messageSent ? (
              <div className="w-full bg-green-400 dark:bg-green-500 flex flex-col justify-center content-center">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-white">
                    Message Sent Successfully!
                  </CardTitle>
                </CardHeader>
                <Lottie
                  className="w-60 mx-auto"
                  loop={false}
                  animationData={animation}
                />
                <CardFooter>
                  <Button
                    onClick={toggleMessageSent}
                    className="w-fit mx-auto block mt-4"
                  >
                    Send Another Message
                  </Button>
                </CardFooter>
              </div>
            ) : (
              <>
                <CardContent className="mt-5">
                  <form onSubmit={submitHandler}>
                    <div className="flex flex-col mb-4">
                      <Label className="mb-0.5">
                        Full Name:{" "}
                        <p className="inline text-red-400">
                          {nameInvalidInput ? "*(cannot leave empty)" : ""}
                        </p>
                      </Label>
                      <Input
                        type="text"
                        value={name}
                        placeholder="Your Name"
                        onChange={changeNameInputHandler}
                        onBlur={blurNameInputHandler}
                        className={`w-full`}
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <Label className="mb-0.5">
                        Email:{" "}
                        <p className="inline text-red-400">
                          {emailInvalidInput ? "*(cannot leave empty)" : ""}
                        </p>
                      </Label>
                      <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={changeEmailInputHandler}
                        onBlur={blurEmailInputHandler}
                        className={`w-full rounded-md `}
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <Label className="mb-0.5">
                        Message:{" "}
                        <p className="inline text-red-400">
                          {messageInvalidInput ? "*(cannot leave empty)" : ""}
                        </p>
                      </Label>
                      <Textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={changeMessageInputHandler}
                        onBlur={blurMessageInputHandler}
                        className={`w-full `}
                        name="message"
                        rows={5}
                      ></Textarea>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex">
                          <AiOutlineLoading3Quarters className="me-2 text-xl animate-spin" />
                          Sending
                        </div>
                      ) : (
                        <div className="flex">
                          <IoMailOpenOutline className="me-2 text-xl" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                  {error && (
                    <Label className="text-red-400 mt-3 block">
                      <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
                      Something went wrong! Please try again.
                    </Label>
                  )}
                  {/* <Button
                    onClick={toggleMessageSent}
                    className="w-fit mx-auto block mt-4"
                  >
                    Send Another Message
                  </Button> */}
                </CardContent>
              </>
            )}
          </Card>
        </Card>
      </section>
    </Element>
  );
};

export default ContactSection;
