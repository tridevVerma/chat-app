import React from "react";

const Sidebar = () => {
  const user = {
    fname: "Tridev",
    lname: "Verma",
    job: "Web Developer",
    active_status: true,
  };

  const groups = ["Hyderabad Office", "Delhi Office", "Pune Office"];

  return (
    <div className="sidebar">
      <div className="heading">
        <div className="avatar-title">
          <div
            className="avatar"
            data-letters={user.fname.charAt(0) + user.lname.charAt(0)}
            data-active={user.active_status}
          ></div>
          <div className="title">
            <h4>{user.fname + " " + user.lname}</h4>
            <p>{user.job}</p>
          </div>
        </div>
      </div>

      <div className="conversations">
        <div className="add-conversation">
          <h4>Conversations </h4>
          <button>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="group-conversations">
          <ul>
            {groups.map((group, index) => {
              return (
                <li key={index}>
                  <span className="group-icon">#</span>
                  {group}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
