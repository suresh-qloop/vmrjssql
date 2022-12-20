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
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

exports.keyValue = (input) =>
  Object.entries(input).forEach(([key, value]) => {
    console.log(key, value);
    return { key, value };
  });
