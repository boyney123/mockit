import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export default function (options) {
  useEffect(() => {
    const sr = (window.sr = ScrollReveal());
    options.forEach(({ selector, options }) => {
      sr.reveal(selector, options);
    });
  }, []);
}
