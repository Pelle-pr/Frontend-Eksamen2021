import { URL } from "../utils/settings";
import apiFacade, { handleHttpErrors } from "./apiFacade";

const crmFacade = () => {
  const addOpportunity = (id, opp) => {
    return fetch(
      URL + "/api/opportunity/" + id,
      apiFacade.makeOptions("POST", true, opp)
    ).then(handleHttpErrors);
  };

  const getOpps = (id) => {
    return fetch(
      URL + "/api/opportunity/" + id,
      apiFacade.makeOptions("GET", true)
    ).then(handleHttpErrors);
  };

  return { addOpportunity, getOpps };
};

const facade = crmFacade();
export default facade;
