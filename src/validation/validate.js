const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
};

const validateName = (name) => {
  const re = /^[a-zA-Z ]*$/;
  return re.test(String(name));
};

const validatePhoneNumber = (phone) => {
  const re = /^\d{10}$/;
  return re.test(String(phone));
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validatePhoneNumber,
};
