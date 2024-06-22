import { useState, useEffect } from "react";

const useFormattedDate = (date) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(
    () =>
      setFormattedDate(
        new Date(date).toLocaleString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      ),
    []
  );

  return formattedDate;
};

export default useFormattedDate;
