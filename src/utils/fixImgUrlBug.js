export default function index(s) {
  console.log("this is s: ");
  console.log(s);
  if (s !== undefined && s !== null)
    return s.slice(0, 5) + "/" + s.slice(5, s.length);
  else return s;
}
