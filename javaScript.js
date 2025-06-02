const pulleyTarget = document.getElementById("pulley_target");
const inputsForce = document.querySelector(".inputs-force");
const inputsWeight = document.querySelector(".inputs-weight");
const inputsNumber = document.querySelector(".inputs-number");
const result = document.getElementById("result_pulley");
const pulleyInputs = document.querySelectorAll('.inputs-force input, .inputs-weight input, .inputs-number input');

const leverTarget = document.getElementById("lever_target");
const inputsLforce = document.querySelector(".inputs-Lforce");
const inputsResistance = document.querySelector(".inputs-resistance");
const inputsResistanceArm = document.querySelector(".inputs-resistance_arm");
const inputsLforceArm = document.querySelector(".inputs-Lforce_arm");
const resultL = document.getElementById("result_lever");
const leverInputs = document.querySelectorAll('.inputs-Lforce input, .inputs-reistance input, .inputs-resistance_arm input, .inputs-Lforce_arm input');

leverTarget.addEventListener("change", () => {
  const value = leverTarget.value;
  inputsLforce.style.display = "none";
  inputsResistance.style.display = "none";
  inputsLforceArm.style.display = "none";
  inputsResistanceArm.style.display = "none";

  if (value === "Lforce") inputsLforce.style.display = "block";
  else if (value === "resistance") inputsResistance.style.display = "block";
  else if (value === "Lforce_arm") inputsLforceArm.style.display = "block";
  else if (value === "resistance_arm") inputsResistanceArm.style.display = "block";
});


const calculateBtn = document.getElementById('calculate_lever')



calculateBtn.addEventListener('click', () => {
  const target = leverTarget.value
  let F, R, RA, FA

  switch (target) {
    case 'Lforce': 
      R = parseFloat(document.getElementById('resistance_input').value)
      FA = parseFloat(document.getElementById('Lforce_arm_input').value)
      RA = parseFloat(document.getElementById('resistance_arm_input').value)
      if (R >= 0 && FA > 0 && RA > 0) {
        F = (R * RA) / FA
        resultL.textContent = `To balance the lever, you need to apply a force of ${F.toFixed(3)} N.`
      } else resultL.textContent = 'Please enter valid positive values for resistance and arms.'
      break

    case 'resistance': 
      F = parseFloat(document.getElementById('Lforce_input').value)
      FA = parseFloat(document.getElementById('Lforce_arm_input2').value)
      RA = parseFloat(document.getElementById('resistance_arm_input2').value)
      if (F >= 0 && FA > 0 && RA > 0) {
        R = (F * FA) / RA
        resultL.textContent = `The resistance that can be balanced with this force is ${R.toFixed(3)} N.`
      } else resultL.textContent = 'Please enter valid positive values for force and arms.'
      break

    case 'resistance_arm': 
      R = parseFloat(document.getElementById('resistance_input2').value)
      FA = parseFloat(document.getElementById('Lforce_arm_input3').value)
      F = parseFloat(document.getElementById('Lforce_input2').value)
      if (R >= 0 && FA > 0 && F > 0) {
        RA = (F * FA) / R
        resultL.textContent = `The resistance arm required for balance is ${RA.toFixed(3)} m.`
      } else resultL.textContent = 'Please enter valid positive values for resistance, force, and force arm.'
      break

    case 'Lforce_arm':
      R = parseFloat(document.getElementById('resistance_input3').value)
      RA = parseFloat(document.getElementById('resistance_arm_input3').value)
      F = parseFloat(document.getElementById('Lforce_input3').value)
      if (R >= 0 && RA > 0 && F > 0) {
        FA = (R * RA) / F
        resultL.textContent = `The force arm required for balance is ${FA.toFixed(3)} m.`
      } else resultL.textContent = 'Please enter valid positive values for resistance, force, and resistance arm.'
      break
  }
})


pulleyTarget.addEventListener("change", () => {
  const value = pulleyTarget.value;
  inputsForce.style.display = "none";
  inputsWeight.style.display = "none";
  inputsNumber.style.display = "none";

  if (value === "force") inputsForce.style.display = "block";
  else if (value === "weight") inputsWeight.style.display = "block";
  else if (value === "number") inputsNumber.style.display = "block";
});


document.getElementById("calculate_pulley").addEventListener("click", () => {
  const target = pulleyTarget.value;
  let output = "";

  if (target === "force") {
    const R = parseFloat(document.getElementById("force").value);
    const n = parseInt(document.getElementById("number").value);
    if (isNaN(R) || isNaN(n)) {
      output = "Please input valid numbers.";
      result.textContent = output;
      return;
     }
    const F = R / Math.pow(2, n);
    output = `The required Force(F) is: ${F.toFixed(2)} N`;
  } else if (target === "weight") {
    const F = parseFloat(document.getElementById("weight").value);
    const n = parseInt(document.getElementById("number2").value);
    if (isNaN(F) || isNaN(n)) {
      output = "Please input valid numbers.";
      result.textContent = output;
      return;
    }
    const R = F * Math.pow(2, n);
    output = `The required Weight(W) is: ${R.toFixed(2)} N`;
  } else if (target === "number") {
    const F = parseFloat(document.getElementById("force2").value);
    const R = parseFloat(document.getElementById("weight2").value);
    if (isNaN(F) || isNaN(R)) {
      output = "Please input valid numbers.";
      result.textContent = output;
      return;
    }
    const n = Math.log2(R / F);
    output = `The required quantity of movable pulleys is: ${n.toFixed(2)}`;
  }

  result.textContent = output;
});

pulleyInputs.forEach(input => {
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("calculate_pulley").click(); 
    }
  });
});

leverInputs.forEach(input => {
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("calculate_lever").click(); 
    }
  });
});
