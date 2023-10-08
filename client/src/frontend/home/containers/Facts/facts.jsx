import style from "./facts.module.css";

function Facts() {
  return (
    <section className={style.facts}>
      <div className={style.fact}>
        <h1>110+</h1>
        <p>Automation templates for creating your campaigns quickly</p>
      </div>
      <div className={style.fact}>
        <h1>4M</h1>
        <p>Automation templates for creating your campaigns quickly</p>
      </div>
      <div className={style.fact}>
        <h1>99.99%</h1>
        <p>Automation templates for creating your campaigns quickly</p>
      </div>
    </section>
  );
}

export default Facts;
