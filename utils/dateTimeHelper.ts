import { Page } from "@playwright/test";

export class DateTimeHelper {
  // Get the current date and time
  static now(): string {
    return new Date().toISOString();
  }

  static formatDate(
    date: Date = new Date(),
    format: string = "YYYY-MM-DD"
  ): string {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate}`.slice(-2);

    switch (format) {
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "MM/DD/YYYY":
        return `${day}/${month}/${year}`;
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;
      case "MM-YYYY":
        return `${year}-${month}`;
      default:
        return date.toISOString();
    }
  }

  adjustDate(inputDate: string, offsetDays: number): string {
    const [day, month, year] = inputDate.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() + offsetDays);

    const newDay = String(date.getDate()).padStart(2, "0");
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newYear = date.getFullYear();

    return `${newDay}/${newMonth}/${newYear}`;
  }

  parseDateString(dateString: string): {
    day: string;
    month: string;
    year: string;
  } {
    const [day, month, year] = dateString.split("/");
    return {
      day: parseInt(day, 10).toString(),
      month: parseInt(month, 10).toString(),
      year,
    };
  }

  monthNumberToEnglish(monthStr: string): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthNum = parseInt(monthStr, 10); // Chuyển sang số
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      throw new Error("Invalid month number");
    }

    return months[monthNum - 1];
  }
}
