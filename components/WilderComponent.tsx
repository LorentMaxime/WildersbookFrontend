import Image from "next/image";
import blank_profile from "../public/blank-profile-picture-female.png";
import Skill, { ISkills } from "./SkillsComponent";
import axios from "axios";

export interface IWilder {
  _id?: string;
  name: string;
  city: string;
  skills: ISkills[];
  fetchWilders?: any;
}

const Wilder = ({ _id, name, city, skills, fetchWilders }: IWilder) => {
  async function deleteWilder() {
    console.log(_id);
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/wilder/delete/${_id}`
      );
      if (result) {
        console.log(result);
        fetchWilders();
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  async function updateWilder() {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/wilder/update/${_id}`
      );
      if (result) {
        console.log(result);
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <article className="card">
      <Image src={blank_profile} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((wilderskills) => (
          <Skill title={wilderskills.title} votes={wilderskills.votes} />
        ))}
      </ul>
      <button onClick={deleteWilder}>Delete</button>
      <button onClick={updateWilder}>Update</button>
    </article>
  );
};

export default Wilder;
