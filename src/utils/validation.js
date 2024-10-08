export const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
export const validatePhone = function (phone) {
  const re = /^(\()?\d{10}$/;
  return re.test(phone);
};
