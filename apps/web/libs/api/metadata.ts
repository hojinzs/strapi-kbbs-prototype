import axios from "axios";

export function getMetadata() {
  return axios.get("/metadata");
}
