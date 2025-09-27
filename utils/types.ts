export type ProfileData = {
  profileId: string;
  lastName: string;
  firstName: string;
  birthday: string;
  arrivalDate: string;
  deptDate: string;
  nation: string;
  nationality: string;
  passport: string;
  idNo: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  residentCard: string;
  validToDate: string;
  identityIssueDate: string;
  identityIssueBy: string;
  otherDocument: string;
  visa: string;
};

export type fieldBooking = {
  numProfile: string;
  name: string;
  phone: string;
  email: string;
  arrivalDate: string;
  deptDate: string;
};

export type ProfileTemplate = Partial<ProfileData>;

export type ProfileGenerators = {
  [K in keyof ProfileTemplate]: () => ProfileTemplate[K];
};

export type InputFieldType =
  | "firstName"
  | "lastName"
  | "birthday"
  | "gender"
  | "profile"
  | "arrivalDate"
  | "deptDate"
  | "email"
  | "phone"
  | "address1"
  | "address2"
  | "national"
  | "nationality"
  | "numMember"
  | "guestLevel"
  | "occupation"
  | "passport"
  | "typePassport"
  | "residentCard"
  | "validToDate"
  | "idNo"
  | "identityIssueDate"
  | "identityIssueBy"
  | "otherDocument"
  | "visa"
  | "typeVisa"
  | "issueDate"
  | "expriseDate"
  | "issuedBy"
  | "entryDateFrom"
  | "entryDateTo"
  | "entryFrom"
  | "entryPort"
  | "note"
  | "purpose"
  | "saveAndUpdateGuestProfile"
  | "arrTime"
  | "deptTime"
  | "saveAndUpdateGuestProfile";

export type Country = {
  code: string;
  description: string;
};

export type Port = {
  code: string;
  description: string;
};

export type FormField = {
  value: string;
  error?: string;
  touched: boolean;
};

export type BookingRecord = {
  STT: string;
  ConfirmCode: string;
  MultiResv: string; // Số phòng
  ExternalIdentifier: string; // Mã định danh bên ngoài
  NameGroup: string; // Tên nhóm
  FullName: string; // Họ và tên
  BookedRmType: string; // Loại phòng đặt
  NumRoom: string; // Số phòng
  RateCode: string; // Mã giá
  Price: string; // Giá
  ArrivalDate: string; // Ngày đến
  ArrivalTime: string; // Giờ đến
  DeptDate: string; // Ngày đi
  DeptTime: string; // Giờ đi
  Night: number; // Số đêm
  Adult: string; // Người lớn
  Children: string; // Trẻ em
  User: string; // Người tạo
  BalanceDue: number; // Số dư phải trả
  MarketSegment: string; // Phân khúc thị trường
  CompanyTA: string; // Công ty/Đại lý
  Note: string; // Ghi chú
  Currency: string; // Loại tiền
  NoOfRooms: string; // Số phòng
  Source: string; // Nguồn
  PaymentMethod: string; // Phương thức thanh toán
  ArrivalCarrier: string; // Phương tiện đến
};

export type Group = {
  STT: string;
  ExternalIdentifier: string; // Mã định danh bên ngoài
  NameGroup: string; // Tên nhóm
  FullName: string; // Họ và tên
  Status: string; // Trạng thái
  BookedRmType1: string; // Loại phòng đặt
  BookedRmType2: string; // Loại phòng đặt
  NumOfRoomType1: string; // Số phòng loại 1
  NumOfRoomType2: string; // Số phòng loại 2
  NumberOfGuests1: string; // Số khách loại 1
  NumberOfGuests2: string; // Số khách loại 2
  NumRoom: string; // Số phòng
  RateCode: string; // Mã giá
  Price: string; // Giá
  ArrivalDate: string; // Ngày đến
  ArrivalTime: string; // Giờ đến
  DeptDate: string; // Ngày đi
  DeptTime: string; // Giờ đi
  Night: number; // Số đêm
  Adult: string; // Người lớn
  Children: string; // Trẻ em
  User: string; // Người tạo
  BalanceDue: number; // Số dư phải trả
  MarketSegment: string; // Phân khúc thị trường
  CompanyTA: string; // Công ty/Đại lý
  Note: string; // Ghi chú
  Currency: string; // Loại tiền
  NoOfRooms: string; // Số phòng
  Source: string; // Nguồn
  PaymentMethod: string; // Phương thức thanh toán
  ArrivalCarrier: string; // Phương tiện đến
  DeptCarrier: string; // Phương tiện đi
};
