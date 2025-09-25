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

/**
 * Example usage:
 * const arrival = arrivalDate();
 * const departure = deptDate(arrival);
 * console.log('Arrival:', arrival);    // Example: "15/04/2025"
 * console.log('Departure:', departure); // Example: "20/04/2025"
 */
