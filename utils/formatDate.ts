const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function getFormattedDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const daySuffix = getOrdinalSuffix(day);
  const monthName = date.toLocaleDateString("en-US", { month: "long" });

  return `${day}${daySuffix} of ${monthName}, ${year}`;
}

export function getAge(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const yearStr = years === 1 ? "year" : "years";
  const monthStr = months === 1 ? "month" : "months";

  return `${years} ${yearStr}, ${months} ${monthStr} old`;
}
