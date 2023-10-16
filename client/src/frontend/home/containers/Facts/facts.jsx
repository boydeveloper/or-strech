import style from "./facts.module.css";

function Facts() {
  const facts = [
    {
      number: "150+",
      description: "Tailored stretches for surgical specialties",
    },
    {
      number: "5M+",
      description: "Surgeon hours spent using OR-Stretch",
    },
    {
      number: "99.9%",
      description: "Sterility compliance rate during stretches",
    },
    // Add more facts as needed
  ];

  return (
    <div className={style.factsWrapper}>
      <section className={style.facts}>
        {facts.map((fact, index) => (
          <div className={style.fact} key={index}>
            <h1>{fact.number}</h1>
            <p>{fact.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Facts;
