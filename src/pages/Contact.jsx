import { useState } from "react";
import { Footer, PagesHeader, ShowNotification } from "../components";
import { useUserCredentials } from "../context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { DB } from "../config/firebase";

const Contact = () => {
  const [, , , userCredentials, userIsLoading] = useUserCredentials();
  const [userComment, setUserComment] = useState("");
  const [postIsLoading, setPostIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setPostIsLoading(true);
      await addDoc(collection(DB, "comments"), {
        userComment,
        userEmail: userCredentials.email,
        timestamp: serverTimestamp(),
      });
      ShowNotification({
        title: "Success",
        text: "Your comment has been successfully submitted.",
        icon: "success",
      });
      setUserComment("");
      setPostIsLoading(false);
    } catch (error) {
      setPostIsLoading(false);
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <PagesHeader />
      <section className="login header bg-navy">
        <div className="container">
          <div className="d-flex flex-column align-items-center hero gap-5">
            <div>
              <div className="hero-headline text-start">Contact Us</div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="form-login d-flex flex-column mt-4 mt-md-0 p-30"
            >
              <div className="d-flex flex-column align-items-start">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue={userCredentials.email}
                  disabled
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="d-flex flex-column ">
                <div className="form-floating">
                  <textarea
                    className="form-control textarea"
                    id="floatingTextarea2"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    required
                    value={userComment}
                    onChange={(event) => setUserComment(event.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea2" className="text-secondary">
                    Leave a comment here
                  </label>
                </div>
              </div>
              <div className="d-grid mt-2 gap-4">
                <button type="submit" className="btn-green">
                  {postIsLoading ? "Sending Comment..." : "Send Comment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
