/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Get build my profile datas
 */
export function getBuildProfile(myusername) {
  return axios.get(
    `${config.API.V5}/members/${myusername}/traits?traitIds=basic_info,work,education,languages`
  );
}

/**
 * createWorkExperiences
 */
export function createWorkExperiences(myusername, data) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Work",
      traitId: "work",
      traits: {
        data: data,
      },
    },
  ]);
}

/**
 * updateWorkExperiences
 */
export function updateWorkExperiences(myusername, data) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Work",
      traitId: "work",
      traits: {
        data: data,
      },
    },
  ]);
}

/**
 * createEducationExperiences
 */
export function createEducationExperiences(myusername, data) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Education",
      traitId: "education",
      traits: {
        data: data,
      },
    },
  ]);
}

/**
 * updateEducationExperiences
 */
export function updateEducationExperiences(myusername, data) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Education",
      traitId: "education",
      traits: {
        data: data,
      },
    },
  ]);
}

/**
 * createLanguageExperiences
 */
export function createLanguageExperiences(myusername, data) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Languages",
      traitId: "languages",
      traits: {
        data: data,
      },
    },
  ]);
}

/**
 * updateLanguageExperiences
 */
export function updateLanguageExperiences(myusername, data) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: "Languages",
      traitId: "languages",
      traits: {
        data: data,
      },
    },
  ]);
}
