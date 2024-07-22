import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import phone from '../phone.png'

export const PublicPage = () => {
  return (
    <div className="public-page">
      <div className="public-page-left">
        <div className="public-page-left-title">
          <h1>Automate the management of all your company's</h1>
          <h2>expenses</h2>
        </div>
        <span>Automate the management of your employees' expenses by scanning tickets and invoices</span>
        <Link to="/dashboard"><button className="button-29">Sign in</button></Link>
      </div>
      <img src={phone}></img>
    </div>
  );
};
