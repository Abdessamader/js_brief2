const levelType = document.querySelector(".levelType");
const MaxScore = document.querySelector(".MaxScore");
const MinScore = document.querySelector(".MinScore");
const SubmitLevel = document.querySelector(".SubmitLevel");
const DisplayAllLevel = document.querySelector("#DisplayAllLevel");
const DivupdateLevel = document.querySelector("#DivupdateLevel");

class AddLevel {
  constructor(levelType, MaxScore, MinScore) {
    this.levelType = levelType;
    this.MaxScore = MaxScore;
    this.MinScore = MinScore;
  }

  getAllLevel = async () => {
    const response = await fetch("http://localhost:3000/Level", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    this.GlobalDataLevel = data;
    this.displayLevel(data);
  };

  displayLevel = (data) => {
    DisplayAllLevel.innerHTML = "";
    data.map((e) => {
      DisplayAllLevel.innerHTML += `
            <div class=" d-flex  ">
            <button class=" btn btn-outline-dark   w-25 mx-5 mb-2" onclick="getLevel.getLevelId(${e.id},'${e.levelType}')">
                 ${e.levelType}
            </button>
            <button class="btn btn-outline-danger mb-2" type="submit" onclick="getLevel.DeleteLevel(${e.id})" >Delete</button>
            </div>
        `;
    });
  };
  getLevelId = (id, levelType) => {
    this.id = id;
    this.levelType = levelType;
    let data = this.GlobalDataLevel.find((level) => level.id == id);
    DivupdateLevel.innerHTML = "";
    DivupdateLevel.innerHTML = `
        <input type="text" id="MinSco" value="${data.MinScore}">
        <input type="text" id="MaxSco" value="${data.MaxScore}">
        <button type="submit" class="btn btn-success" onclick="getLevel.updateLevel()" >Update</button>`;
  };

  addLevel = async () => {
    const response = await fetch("http://localhost:3000/Level", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        levelType: this.levelType,
        MaxScore: this.MaxScore,
        MinScore: this.MinScore,
      }),
    });

    let data = await response.json();
  };

  DeleteLevel = async (id) => {
    const response = await fetch(`http://localhost:3000/Level/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    this.getAllLevel();
  };

  updateLevel = async () => {
    const MinSco = document.getElementById("MinSco");
    const MaxSco = document.getElementById("MaxSco");
    const response = await fetch(`http://localhost:3000/Level/${this.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        levelType: this.levelType,
        MaxScore: MaxSco.value,
        MinScore: MinSco.value,
        id: this.id,
      }),
    });
    let data = await response.json();
  };
}

let getLevel = new AddLevel();
getLevel.getAllLevel();

if(SubmitLevel){
    
    SubmitLevel.addEventListener("click",  () => {
      let LvL = new AddLevel(levelType.value, MaxScore.value, MinScore.value);
      LvL.addLevel();
    });
}
