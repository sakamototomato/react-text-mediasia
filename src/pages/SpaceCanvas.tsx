import "./spaceCanvas.scss";
function SpaceCanvas() {
  const pastYears = 250;
  return (
    <>
      <p>{pastYears} years</p>
      <div className="img-container">
        <img src="space-background.png" alt="space-bg" />
      </div>
    </>
  );
}

export default SpaceCanvas;
