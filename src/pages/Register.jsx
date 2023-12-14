import { useEffect, useState } from "react";
import { BottomLogo, PagesHeader, ShowNotification } from "../components";
import { registerForms } from "../constants";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { DB, auth } from "../config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [datas, setDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    signOut();
  }, []);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setDatas({
      ...datas,
      [id]: value,
    });
  };

  const inputValidation = () => {
    const { firstname, lastname, email, password } = datas;

    if (!firstname || !lastname || !email || !password) {
      throw new Error("missing fields");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      inputValidation();
      setIsLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        datas.email,
        datas.password
      );
      await sendEmailVerification(res.user);
      await setDoc(doc(DB, "users", res.user.uid), {
        ...datas,
        role: 2,
        timestamp: serverTimestamp(),
      });
      setIsLoading(false);
      navigate("/login");
      ShowNotification({
        title: "Account created",
        text: "Your account has been successfully created. Please check your email for further instructions",
        icon: "success",
      });
    } catch (error) {
      setIsLoading(false);
      if (error.message === "missing fields") {
        ShowNotification({
          title: "Form submission error",
          text: "Oops! it seems like there are missing fields",
          icon: "error",
        });
      } else {
        ShowNotification({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <PagesHeader />
      <section className="login header bg-navy">
        <div className="container">
          <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero">
            <div className="col-md-6">
              <div className="hero-headline text-start">
                Expand Your <br className="d-none d-md-block" />
                Knowledge & Skills
              </div>
              <p className="hero-paragraph text-start">
                Kami menyediakan berbagai acara terbaik untuk membantu{" "}
                <br className="d-none d-lg-block" />
                anda dalam meningkatkan skills di bidang teknologi
              </p>
            </div>
            <div className="col-md-6">
              <form
                onSubmit={handleFormSubmit}
                className="form-login d-flex flex-column mt-4 mt-md-0"
              >
                {registerForms.map((register, index) => (
                  <div
                    className="d-flex flex-column align-items-start"
                    key={index}
                  >
                    <label className="form-label">{register.label}</label>
                    <input
                      id={register.id}
                      type={register.type}
                      placeholder={register.placeholder}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                ))}

                <div className="d-grid mt-2">
                  <button type="submit" className="btn-green">
                    {isLoading ? "Please wait..." : "Sign Up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <BottomLogo />
    </>
  );
};

export default Register;
