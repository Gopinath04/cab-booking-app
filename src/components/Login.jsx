import "bootstrap/dist/css/bootstrap.min.css";
import InnerBanner from "./innerbanner";


const Bannerdata = {
  title: "Login",
  navtext: "Login"
};

export default function Login() {
  return (
    <article className="pb-100">
          <InnerBanner bannertext={Bannerdata} />
          </article>
  );
}

