import axios from "axios";
import { PersonTransformationInterface } from "../Admin";

const baseUrlApi=import.meta.env.VITE_REACT_APP_DB;

export interface PersonFromDbInterface {
    _id: string;
    namePerson: string;
    imageBefore: string;
    imageAfter: string;
  }

interface PersonResponse{
success: boolean;
data: PersonFromDbInterface;
}

interface PersonResponseGetAll{
success: boolean;
data: PersonFromDbInterface[];
}

export const createPerson=async(dataNewPerson: PersonTransformationInterface): Promise<PersonFromDbInterface| undefined>=>{
    try {
    const newPerson: PersonResponse= (await axios.post(`${baseUrlApi}/persons/create`, dataNewPerson)).data;
        return newPerson.data;
} catch (error) {
    throw new Error();
}
};

export const getTransformations= async():Promise<PersonFromDbInterface[] | undefined>=>{
try {
    const allPersons: PersonResponseGetAll= (await axios.get(`${baseUrlApi}/persons`)).data;
    return allPersons.data;
} catch (error) {
    throw new Error();
}
}

export const deteleTransformations= async(id:string):Promise<boolean | undefined>=>{
try {
    const allPersons: PersonResponse= (await axios.delete(`${baseUrlApi}/persons/delete/${id}`)).data;
    if(allPersons.success){
        return true;
    }
} catch (error) {
    throw new Error();
}
}

