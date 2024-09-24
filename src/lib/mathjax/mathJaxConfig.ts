import { 
  MathJax3Config,
} from 'better-react-mathjax';

/**
 * MathJax config
 * 
 * {@link https://docs.mathjax.org/en/latest/options/input/tex.html#option-descriptions MathJax Config 공식문서 }
 * 
 * {@link https://codesandbox.io/p/sandbox/better-react-mathjax-example-latex-forked-l8m5mh?file=%2Fsrc%2FApp.js%3A8%2C18 better-react-mathjax 예시 코드 }
 */
const mathJaxConfig: MathJax3Config = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: false,

    packages: {
      '[+]': [
        'cancel',
      ],
    },
  },

  loader: {
    load: [
      '[tex]/cancel',
    ],
  },
};

export default mathJaxConfig;
