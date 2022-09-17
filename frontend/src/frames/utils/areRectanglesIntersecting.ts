export const areRectanglesIntersecting = (lhs: any, rhs: any) => {
  return (
    lhs.left <= rhs.right &&
    lhs.right >= rhs.left &&
    lhs.top <= rhs.bottom &&
    lhs.bottom >= rhs.top
  );
};
