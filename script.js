window.onload = function () {
  var money = 0;
  var moneyclock = setInterval(getMoney, 500);
  var Makan = 50;
  var clock1 = setInterval(depleteH, 3000);
  var Tidur = 50;
  var clock2 = setInterval(depleteB, 3100);
  var Main = 50;
  var clock3 = setInterval(depleteF, 3000);
  var Belajar = 0;
  var clock4 = setInterval(depleteK, 1000);
  var almet = false;
  var toga = false;
  var gameover = 0;
  var fillSemester = 1;
  document.getElementById("semestervalue").value = fillSemester;

  document.getElementById("BtnMakan").onclick = fillMakan;
  document.getElementById("BtnTidur").onclick = fillTidur;
  document.getElementById("BtnMain").onclick = fillMain;
  document.getElementById("BtnBelajar").onclick = fillBelajar;

  document.getElementById("item1").onclick = nuggetsEffect;
  document.getElementById("item2").onclick = medicineEffect;
  document.getElementById("item3").onclick = antidepressantsEffect;

  document.getElementById("atribut1").onclick = falmet;
  document.getElementById("atribut2").onclick = ftoga;

  class DigitalClock {
    constructor(element) {
      this.element = element;
    }

    start() {
      this.update();

      setInterval(() => {
        this.update();
      }, 1000);
    }

    update() {
      const parts = this.getTimeParts();
      const minuteFormatted = parts.minute.toString().padStart(2, "0");
      const timeFormatted = `${parts.hour}:${minuteFormatted}`;
      const amPm = parts.isAm ? "AM" : "PM";

      this.element.querySelector(".clock-time").textContent = timeFormatted;
      this.element.querySelector(".clock-ampm").textContent = amPm;
    }

    getTimeParts() {
      const now = new Date();

      return {
        hour: now.getHours() % 12 || 12,
        minute: now.getMinutes(),
        isAm: now.getHours() < 12,
      };
    }
    
  }

  const clockElement = document.querySelector(".clock");
  const clockObject = new DigitalClock(clockElement);

  clockObject.start();

  showTime();

  function gameovercheck() {
    if (Makan == 0 && Tidur == 0 && Main == 0 && gameover == 0) {
      alert("Game Over!");
      gameover++;
      playerHandler();
    } else {
      playerHandler();
    }
  }

  function playerHandler() {
    if (Makan == 0 && Tidur == 0 && Main == 0) {
      document.getElementById("player").src = "asset/char4.png";
    } else if (almet == false && toga == false) {
      document.getElementById("player").src = "asset/char2.png";
    } else if (almet == true && toga == false) {
      document.getElementById("player").src = "asset/char3.png";
    } else if ((almet == true && toga == true) || (almet == false && toga == true)) {
      document.getElementById("player").src = "asset/char1.png";
    }
  }

  function getMoney() {
    if (Makan > 0 && Tidur > 0 && Main > 0) {
      document.getElementById("MoneyValue").value = money;
      money++;
    }
  }

  function nuggetsEffect() {
    if (Makan == 0 && money >= 150 && gameover == 0) {
      money -= 150;
      Makan += 50;
      clock1 = setInterval(depleteH, 3000);
      depleteH();
      playerHandler();
    }
  }

  function medicineEffect() {
    if (Tidur == 0 && money >= 200 && gameover == 0) {
      money -= 200;
      Tidur += 50;
      clock2 = setInterval(depleteB, 3100);
      depleteB();
      playerHandler();
    }
  }

  function antidepressantsEffect() {
    if (Main == 0 && money >= 300 && gameover == 0) {
      money -= 300;
      Main += 50;
      clock3 = setInterval(depleteF, 3000);
      depleteF();
      playerHandler();
    }
  }

  function falmet() {
    if (almet == false && money >= 250) {
      money -= 250;
      almet = true;
      playerHandler();
      clearInterval(moneyclock);
      moneyclock = setInterval(getMoney, 100);
    }
  }

  function ftoga() {
    if (toga == false && fillSemester >= 8) {
      fillSemester -= 8;
      toga = true;
      playerHandler();
      clearInterval(clock1);
      clearInterval(clock2);
      clearInterval(clock3);
      clearInterval(moneyclock);
      alert("Congratulations! You Graduate!");
    }
  }

  function fillMakan() {
    if (Makan <= 99 && Makan != 0) {
      Makan += 5;
      Tidur -= 1;
      document.getElementById("player").src = "asset/eat.png";
    } else if (Makan == 0) {
      Makan += 0;
    }
  }

  function fillTidur() {
    if (Tidur <= 99 && Tidur != 0) {
      Tidur += 5;
      Makan -= 1;
      Main -= 1;
      document.getElementById("player").src = "asset/sleep.png";
    } else if (Tidur == 0) {
      Tidur += 0;
    }
  }

  function fillMain() {
    if (Main <= 99 && Tidur != 0) {
      Main += 5;
      Tidur -= 1;
      Makan -= 1;
      document.getElementById("player").src = "asset/game.png";
    } else if (Main == 0) {
      Main += 0;
    }
  }

  function fillBelajar() {
    if (Belajar <= 100) {
      Belajar += 5;
      Makan -= 2;
      Tidur -= 2;
      document.getElementById("player").src = "asset/study.png";
      document.getElementById("semestervalue").value = fillSemester;
    }
  }

  function depleteH() {
    if (Makan == 0) {
      clearInterval(clock1);
      alert("Your pet is starving!");
      gameovercheck();
    } else {
      Makan--;
      document.getElementById("MakanBar").value = Makan;
    }
  }

  function depleteB() {
    if (Tidur == 0) {
      clearInterval(clock2);
      alert("Your pet has become sick!");
      gameovercheck();
    } else {
      Tidur--;
      document.getElementById("TidurBar").value = Tidur;
    }
  }

  function depleteF() {
    if (Main == 0) {
      clearInterval(clock3);
      alert("Your pet is depressed!");
      gameovercheck();
    } else {
      Main--;
      document.getElementById("MainBar").value = Main;
    }
  }

  function depleteK() {
    if (Belajar > 104) {
      alert("Selamat kamu telah menyelesaikan semester " + fillSemester);
      fillSemester++;
      Belajar = 0;
    } else {
      document.getElementById("BelajarBar").value = Belajar;
    }
  }
};
