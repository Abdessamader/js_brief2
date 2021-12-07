const full_name = document.querySelector(".full_name");
const speciality = document.querySelector(".speciality");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submit_register = document.querySelector(".register");

class Formateurs {
  constructor(email, password, full_name, speciality) {
    this.email = email;
    this.password = password;
    this.full_name = full_name;
    this.speciality = speciality;
  }

  register = async () => {
    const response = await fetch("http://localhost:3000/formateur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
        full_name: this.full_name,
        speciality: this.speciality,
      }),
    });

    let data = await response.json();
    // console.log(data);
  };
}

if(submit_register){
  submit_register.addEventListener("click",  () => {
    let reg = new Formateurs(
      email.value,
      password.value,
      full_name.value,
      speciality.value
    );
    reg.register();
  });

}

 
