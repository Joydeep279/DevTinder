function dataAuth(req, res, next) {
  const isAuthecated = true;
  const token = "5d41402abc4b2a76b9719d911017c592";
  const userToken = "5d41402abc4b2a76b9719d911017c592";
  if (isAuthecated && token === userToken) {
    next();
  } else {
    res.status(401).send("Access Denied");
  }
}
function userAuth(req, res, next) {
  const isAuthecated = true;
  if (isAuthecated) {
    next();
  } else {
    res.status(401).send("User Not Found");
  }
}

module.exports = [dataAuth, userAuth];
