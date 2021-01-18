import { URL } from "../utils/settings";
import apiFacade, { handleHttpErrors } from "./apiFacade";

const crmFacade = () => {
  const addContact = (contact) => {
    return fetch(
      URL + "/api/contact",
      apiFacade.makeOptions("POST", true, contact)
    ).then(handleHttpErrors);
  };

  const getAllContacts = () => {
    return fetch(URL + "/api/contact", apiFacade.makeOptions("GET", true)).then(
      handleHttpErrors
    );
  };

  const getContactById = (id) => {
    return fetch(
      URL + "/api/contact/" + id,
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  const editContact = (contact) => {
    return fetch(
      URL + "/api/contact",
      apiFacade.makeOptions("PUT", true, contact)
    ).then(handleHttpErrors);
  };

  const deleteContact = (id) => {
    return fetch(
      URL + "/api/contact/" + id,
      apiFacade.makeOptions("DELETE", true)
    ).then(handleHttpErrors);
  };

  const addTask = (id, task) => {
    return fetch(
      URL + "/api/task/" + id,
      apiFacade.makeOptions("POST", true, task)
    ).then(handleHttpErrors);
  };

  const getTaskStatus = () => {
    return fetch(
      URL + "/api/task/status",
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  const getTaskType = () => {
    return fetch(
      URL + "/api/task/type",
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  return {
    addContact,
    getAllContacts,
    getContactById,
    editContact,
    deleteContact,
    addTask,
    getTaskStatus,
    getTaskType,
  };
};

const facade = crmFacade();
export default facade;
