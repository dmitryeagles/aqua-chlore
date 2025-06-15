const colors = [
  'rgba(54, 162, 235)', // Синий
  'rgba(255, 99, 132)', // Красный
  'rgba(255, 159, 64)', // Оранжевый
  'rgba(255, 206, 86)', // Желтый
  'rgba(75, 192, 192)', // Зеленый
  'rgba(153, 102, 255)', // Фиолетовый
  'rgba(201, 203, 207)', // Серый
];

export default (index: number): string => colors[index % colors.length];
