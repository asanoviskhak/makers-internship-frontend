import React, { FC } from "react";
import { Link } from "react-router-dom";
const Homepage: FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
        <h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
          incidunt at animi eligendi facere reiciendis ad assumenda, omnis quasi
          id atque consequuntur obcaecati explicabo eius natus quae officiis
          itaque dolorem!
        </h2>
        <Link to="/dashboard" className="button is-primary mt-5">
          Go to wall
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
