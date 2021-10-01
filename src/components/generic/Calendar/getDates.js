export default function getDates(value) {
  if (!(value instanceof Date))
    return new Array(5).fill(0).map((_, row) =>
      new Array(7).fill(0).map((_, column) => {
        return null;
      }),
    );

  const now = new Date();
  const day = value.getDate();
  const weeksBefore = Math.ceil(day / 7);
  let curr = new Date(value);
  console.log(weeksBefore * 7);
  curr.setDate(curr.getDate() - (weeksBefore * 7 - (7 - curr.getDay())));

  return new Array(5).fill(0).map((_, row) =>
    new Array(7).fill(0).map((_, column) => {
      curr.setDate(curr.getDate() + 1);
      if (curr.getMonth() !== value.getMonth()) {
        return {
          type: 'otherMonth',
          date: new Date(curr),
        };
      }
      if (curr.toDateString() === now.toDateString()) {
        return {
          type: 'today',
          date: new Date(curr),
        };
      }
      return {
        type: 'currentMonth',
        date: new Date(curr),
      };
    }),
  );
}
