import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import moment from "moment";
// Get All Launches
const GET_LAUNCHES = gql`
  query {
    launches {
      mission_name
      flight_number
      launch_date_local
      launch_success
    }
  }
`;
// Check class for color
function checkClass(bool) {
  if (bool) return "success";
  return "danger";
}
export default function Launches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  if (error) {
    return <h1>Failed To Load Data</h1>;
  }
  if (loading) {
    return (
      <svg
        className="spinner m-auto" 
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    );
  }
  return (
    <div>
      {data.launches.map((launch) => {
        return (
          <div
            key={launch.flight_number}
            className="card border-secondary mb-3"
          >
            <div className="card-body">
              <div className="info float-left">
                <h4 className="card-title">
                  Mission:{" "}
                  <span className={"text-" + checkClass(launch.launch_success)}>
                    {launch.mission_name}
                  </span>
                </h4>
                <p className="card-text">
                  Date:{" "}
                  {moment(launch.launch_date_local).format("YYYY-MM-DD hh:mm")}
                </p>
              </div>
              <Link
                className="btn btn-secondary float-right"
                to={`launches/${launch.flight_number}`}
              >
                Launch Details
              </Link>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
