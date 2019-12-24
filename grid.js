var smartgrid = require("smart-grid");

var settings = {
  filename: "grid",
  outputStyle: "sass",
  columns: 12,
  offset: '20px',
  mobileFirst: false,
  container: {
    maxWidth: "1390px",
    fields: '20px'
  },
  breakPoints: {
    // lg: {
    //     width: '1280px'
    // },
    // md: {
    //     width: '1000px'
    // },
    // sm: {
    //     width: '768px',
    //     fields: '15px' 
    // },
    // xs: {
    //     width: '480px'
    // }
  }
};

smartgrid("./dev/static/styles/utils", settings);
