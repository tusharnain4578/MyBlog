// const notFound = (req, res) => res.status(404).send('Route does not exist')
const notFound = (req, res) => res.status(404).render("404", { layout: false });

module.exports = notFound;
