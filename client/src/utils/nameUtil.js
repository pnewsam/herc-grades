import capitalize from "voca/capitalize";

export function formatName(name) {
  return name.split(" ").map( w => capitalize(w.toLowerCase()) ).join(" ");
}