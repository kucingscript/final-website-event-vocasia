import React from "react";
import { stories } from "../constants";

const Stories = () => {
  return (
    <>
      <section className="stories">
        <div className="d-flex flex-row justify-content-center align-items-center container">
          <img
            src="/images/story.png"
            alt=""
            className="d-none d-lg-block"
            width="515"
          />
          <div className="d-flex flex-column">
            <div>
              <div className="sub-title">
                <span className="text-gradient-pink">Story</span>
              </div>
              <div className="title">
                One Great Event. <br className="d-none d-lg-block" />
                For The Better World.
              </div>
            </div>
            <p className="paragraph">
              Baca kisah bagaimana Shayna berhasil membangun{" "}
              <br className="d-none d-lg-block" />
              sebuah Startup yang membantu warga untuk{" "}
              <br className="d-none d-lg-block" />
              mendapatkan bantuan selama pandemic.
            </p>
            <button className="btn-navy">Read</button>
          </div>
        </div>
      </section>

      <section className="statistics container">
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
          {stories.map((story, index) => (
            <div
              className="d-flex flex-column align-items-center gap-1"
              key={index}
            >
              <div className="title">{story.title}</div>
              <p>{story.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Stories;
