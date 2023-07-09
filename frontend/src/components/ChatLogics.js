export const GetSender = (loggedUser, users) => {
  if (users.size === 0 || !loggedUser) return;
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const GetSenderFull = (loggedUser, users) => {
  if (users.size === 0) return;
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
