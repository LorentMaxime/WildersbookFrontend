import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// un type-guard, permet a typescript d'etre rassuré sur le typage d'un objet / propriete. Mis ici pour le cas ou error est type en unknown au lieu de any
// function hasProp<K extends PropertyKey>(
//   data: object,
//   prop: K
// ): data is Record<K, unknown> {
//   return prop in data;
// }

// recuperation de la prop fetchWilders dans ma fonction addWilders et typage
function AddWilderForm({ fetchWilders }: { fetchWilders(): Promise<void> }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [vote, setVote] = useState("");
  const [titlebis, setTitleBis] = useState("");
  const [votebis, setVoteBis] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const result = await axios.post(
            "http://localhost:5000/api/wilder/create",
            {
              name: name,
              city: city,
              skills: [
                { title: title, votes: vote },
                { title: titlebis, votes: votebis },
              ],
            }
          );
          //console.log(result);
          if (result.data.success) {
            fetchWilders();
            setError("");
          }
        } catch (error: unknown) {
          //   //utilisation du typeguard pour verifier que error est bien un objet, non null,
          //   //qu'il contient une prop message de type string.inutile tant que typage de error est à "any"
          //   if (typeof error === "object" && error !== null) {
          //     if (
          //       hasProp(error, "message") &&
          //       typeof error.message === "string"
          //     ) {
          //       setError(error.message);
          //     }
          //   }
          const e = error as ErrorEvent;
          console.log(e.error);
          if (e.message) {
            setError(e.message);
          } else {
            setError(e.message);
          }
          console.log(error);
        }
      }}
    >
      <label htmlFor="name-input">Name :</label>
      <input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="city-input">City :</label>
      <input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="title-input" id="skillCard-content__title">
        First Skill :
      </label>
      <input
        id="title-input"
        type="text"
        placeholder="Type the title of your skill"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        id="vote-input"
        type="text"
        placeholder="Type the rate of your skill"
        value={vote}
        onChange={(e) => setVote(e.target.value)}
      />
      <label htmlFor="vote-input">Second Skill</label>
      <input
        id="title-inputbis"
        type="text"
        placeholder="Type the title of your skill"
        value={titlebis}
        onChange={(e) => setTitleBis(e.target.value)}
      />
      <input
        id="vote-inputbis"
        type="text"
        placeholder="Type the rate of your skill"
        value={votebis}
        onChange={(e) => setVoteBis(e.target.value)}
      />
      {error ? <p>{error}</p> : ""}
      <button>Add</button>
    </form>
  );
}

export default AddWilderForm;
