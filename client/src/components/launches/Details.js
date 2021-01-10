import React from "react";
import { Link } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

// Get Launch Query
const GET_LAUNCH = gql`
  query Launch($flight_number: Int) {
    launch(flight_number: $flight_number) {
      mission_name
      flight_number
      launch_success
      launch_year
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;
// Check class for color
function checkClass(bool) {
  if (bool) return 'success';
  return 'danger';
}
export default function Details(props) {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LAUNCH, {
    variables: {flight_number: parseInt(id)}
  });
  if (error) {
    return <div className="container"><h1>Failed To Load Data</h1></div>;
  }
  if (loading) {
    return  <svg
    className="spinner"
    style={{ top: '30px' }} 
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
  </svg>;
  }
  return (
    <div className="container">
      <h1>Launch</h1>
      <h1 className="display-4 my-3 text-dark" style={{fontWeight: 100}}>Mission: {data.launch.mission_name}</h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">Flight Number: {data.launch.flight_number}</li>
        <li className="list-group-item">Launch Year: {data.launch.launch_year}</li>
        <li className="list-group-item">Launch Successfuly: <span className={"text-"+checkClass(data.launch.launch_success)}>{data.launch.launch_success ? 'Yes' : "No" }</span></li>
      </ul>
      <h4 className="mb-3">Rocket Details</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">Rocket Id: {data.launch.rocket.rocket_id}</li>
        <li className="list-group-item">Rocket Name: {data.launch.rocket.rocket_name}</li>
        <li className="list-group-item">Rocket Type: {data.launch.rocket.rocket_type}</li>
      </ul>
      <Link className="btn btn-secondary" to="/">Back</Link>
    </div>
  );
}
