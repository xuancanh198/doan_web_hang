export function formatDateToDMY(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString;
  }
}

export const encodeToBase64 = (input: unknown): string => {
  try {
    const jsonString = JSON.stringify(input);
    return btoa(jsonString);
  } catch (error) {
    console.error("Không thể mã hóa input:", error);
    return "";
  }
};
