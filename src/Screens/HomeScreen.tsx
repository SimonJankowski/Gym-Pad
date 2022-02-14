import React from "react";
import { Link } from "react-router-dom";

const HomeScreen: React.FC = () => {
  return (
    <div className="body d-flex text-center text-dark">
      <div className="container-fluid d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto"></header>
        <main className="px-2">
          <div className="">
            <h1 className="fw-bolder">Gym-Pad</h1>
            <p className="lead fw-bold">
              Progress Tracker for your fitness journey
            </p>
            <Link
              to="/login"
              className="btn btn-lg btn-secondary font-weight-bold border-white"
            >
              Easy login
            </Link>
          </div>
        </main>
        <footer className="mt-auto text-dark-50">
          <p>&copy; by Simon Jankowski </p>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;
