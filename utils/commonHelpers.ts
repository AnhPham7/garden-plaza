import {
  ProfileData,
  ProfileTemplate,
  ProfileGenerators,
  InputFieldType,
} from "@utils/types";
import roomTypeList from "@data/room-type.json";

export const updateDataGuestProfile = async (
  key: keyof InputFieldType,
  value: string,
  jsonHelper?: any,
  profileKey: string = "profile3"
): Promise<void> => {
  jsonHelper?.updateNested(profileKey, key, value);
};

export const updateMultipleProfileFields = async (
  data: Partial<ProfileData>,
  jsonHelper?: any,
  profileKey: string = "profile3"
): Promise<void> => {
  for (const key in data) {
    if (data[key as keyof ProfileData] !== undefined) {
      await updateDataGuestProfile(
        key as keyof InputFieldType,
        data[key as keyof ProfileData]!,
        jsonHelper,
        profileKey
      );
    }
  }
};

export const generateRandomString = (rule: string, length: number) => {
  const number = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const latinh = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const mixed =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let characters = "";
  switch (rule) {
    case "number":
      characters = number;
      break;
    case "lowercase":
      characters = lowercase;
      break;
    case "uppercase":
      characters = uppercase;
      break;
    case "latinh":
      characters = latinh;
      break;
    case "mixed":
      characters = mixed;
      break;
    default:
      break;
  }
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function generateRandomDate(): string {
  const startDate = new Date(2025, 3, 11); // Month is 0-based, so 3 = April
  const endDate = new Date(2025, 3, 30);

  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  return formatDate(new Date(randomTime));
}

export function arrivalDate(): string {
  return generateRandomDate();
}

export function deptDate(arrival: string): string {
  const [day, month, year] = arrival.split("/").map(Number);
  const arrivalDate = new Date(year, month - 1, day);
  const maxDepartureDate = new Date(2025, 3, 30);
  const departure = new Date(arrivalDate);

  const maxDaysToAdd = Math.floor(
    (maxDepartureDate.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysToAdd = Math.min(Math.floor(Math.random() * 7) + 1, maxDaysToAdd);

  departure.setDate(arrivalDate.getDate() + daysToAdd);
  return formatDate(departure);
}

export function generateRandomProfile(): ProfileTemplate {
  const arrival = generateRandomDate();

  const generators: ProfileGenerators = {
    lastName: () =>
      ["Nguyễn", "Trần", "Lê", "Phạm"][Math.floor(Math.random() * 4)],
    firstName: () =>
      ["Quỳnh", "Thủy", "Anh", "Tú"][Math.floor(Math.random() * 4)],
    arrivalDate: () => arrival,
    deptDate: () => deptDate(arrival),
    email: () => `user${Math.floor(Math.random() * 1000)}@example.com`,
    phone: () => `+84${Math.floor(100000000 + Math.random() * 900000000)}`,
    address1: () => `Địa chỉ ${Math.floor(Math.random() * 100)}`,
    address2: () =>
      `Phường ${Math.floor(Math.random() * 10)}, Quận ${Math.floor(Math.random() * 10)}`,
  };

  const result: ProfileTemplate = {} as ProfileTemplate;

  for (const key of Object.keys(generators) as Array<keyof ProfileGenerators>) {
    const generator = generators[key];
    if (generator) {
      result[key] = generator();
    }
  }

  return result;
}

export function getRoomTypeCode(name: string): string {
  //   console.log("name room type: " + name);
  const room = roomTypeList.find((r) => r.name === name.trim());
  return room ? room.code : "";
}
