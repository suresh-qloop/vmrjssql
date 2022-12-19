exports.ROLES = {
  SuperAdmin: "SuperAdmin",
  Analyst: "Analyst",
  SEO: "SEO",
  Content: "Content",
  JrAnalyst: "JrAnalyst",
  User: "User",
  SalesTeam: "SalesTeam",
};

exports.currencyFormat = (num) => {
  console.log(num);
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
