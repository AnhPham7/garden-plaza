export const loginData = {
  username: "importez",
  password: "123Ez@",
};

export const hotelDay = (() => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
})();

export const urlWeb = {
  url: "https://folio.thefive.vn/",
};

export const colorData = {
  checking: "#FF9222",
  connected: "#28A745",
  invalid: "#DC3545",
};

export const configurationData = {
  url: "https://test6.ezfolio.net",
  token:
    "eyJIb3RlbENvZGUiOiI3ZGEzMTk1MC0xMzc5LTQyZTMtYmNiNy0wZmQ5ODk0MjZjZjciLCJTZXJ2aWNlUHJpdmF0ZUtleSI6ImFiZGJjYjBjZjgzYzI1ZWEzNTRkZDg3MGUwNDBkYzNkMmM3MWJjYTc0N2E0ZjQzMDg3NjMwOGYwODllY2NlNGIiLCJUaW1lc3RhbXAiOjE3NDcxMjQwNDEsIkNSTUNvZGUiOiIifQ==",
};

// data test 5
export const guestInfo = {
  guest1: {
    id: "32980",
    name: "Phạm Quốc Anh",
    guest_arr_date: "11/04/2025",
    guest_dept_date: "12/04/2025",
    guest_status: "AR",
  },
  guest2: {
    id: "32984",
    name: "Quanh3",
    guest_arr_date: "11/04/2025",
    guest_dept_date: "16/04/2025",
    guest_status: "IH",
  },
};

// data release
// export const guestInfo = {
//   guest1: {
//     id: "32978",
//     name: "Ronaldo",
//     guest_arr_date: "15/04/2025",
//     guest_dept_date: "01/05/2025",
//     guest_status: "RS",
//   },
//   guest2: {
//     id: "32582",
//     name: "Hùng",
//     guest_arr_date: "10/04/2025",
//     guest_dept_date: "15/04/2025",
//     guest_status: "IH",
//   },

//   guest3: {
//     id: "32662",
//     name: "Nguyễn Thị Mỹ Duyên",
//     guest_arr_date: "11/04/2025",
//     guest_dept_date: "12/04/2025",
//     guest_status: "AR",
//   },
// };
// export const guestProfile = {
//   profile1: {
//     profileId: "23172",
//     title: "Mr",
//     lastname: "Phạm",
//     firstname: "Quốc Anh",
//     gender: "Nam",
//     birthday: "07/10/2003",
//     nationality: "Portugal",
//     passport: "H? chi?u",
//     identityCard: "89458577848573",
//     email: "anh@gmail.com",
//     phone: "+12468874578587",
//     address: "Địa chỉ 1",
//   },
//   profile2: {
//     profileId: "23173",
//   },
// };

export const bookingData = {
  free_character_string: "A@bc123!$%*()-_=+[]{};:'\",.<>?/\\|~`🙂đặc_biệt",
};
