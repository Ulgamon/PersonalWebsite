import ResumeList from "../resume/ResumeList";

const ResumeSection = () => {
  return (
    <section id="resume" className="min-h-screen mx-auto w-full">
      <h3 className="text-5xl w-fit my-4 font-bold mx-auto">Resume</h3>
      <p className="text-lg max-w-[600px] mx-auto mt-4 mb-10">
        A small river named Duden flows by their place and supplies it with the
        necessary regelialia. It is a paradisematic country, in which roasted
        parts of sentences fly into your mouth.
      </p>
      <ResumeList />
    </section>
  );
};

export default ResumeSection;
