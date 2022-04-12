import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Wilder, { IWilder } from "../components/WilderComponent";
import AddWilderForm from "../components/AddWilderFormComponent";
import axios from "axios";

const Home: NextPage = () => {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  //const [trigger, setTrigger] = useState(0);

  //de base useEffect declenche une fois le fetchData lorsqu'il est monté.
  // On declare un tableau vide pour qu'il ne la declenche qu'une fois
  const fetchWilders = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/wilder/read");
      console.log(result.data.result);
      setWilders(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWilders();
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>

      <main className="container">
        <AddWilderForm fetchWilders={fetchWilders} />

        <h2>Wilders</h2>
        <section className="card-row">
          {/* use .map on my array wilders, into the brackets the arrow function I want to apply on my inital array 
          into the brackets of the function I name my param which will be each time one of my object */}
          {wilders.map((wilder) => (
            <Wilder
              key={wilder._id}
              _id={wilder._id}
              name={wilder.name}
              city={wilder.city}
              skills={wilder.skills}
              fetchWilders={fetchWilders}
            />
          ))}
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
