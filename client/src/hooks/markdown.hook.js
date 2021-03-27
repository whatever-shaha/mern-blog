import { Remarkable } from "remarkable";
import { useEffect } from "react";

const useMd = (id, text) => {
  const md = new Remarkable('full')
  useEffect( () => { 
    document.getElementById(id).innerHTML = md.render(text)
  })
}
export default useMd