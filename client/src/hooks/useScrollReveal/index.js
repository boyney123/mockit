import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default selector => useEffect(() => ScrollReveal().reveal(selector));
