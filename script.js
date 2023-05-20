const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  rempopup = document.querySelector(".rempopup"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                    <li onclick="reminder(${id}, '${note.title}')"><i class="uil uil uil-bell"></i>Notify</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function reminder(noteId, title) {
  noteId = noteId;
  title = title;
  var minutes;
  minutes = prompt("Notify in: (seconds)");
  if (minutes != null) {
    var fminutes = minutes * 1000;
    setTimeout(function () {
      alertrrem(noteId, title);
    }, fminutes);
  }
}
function alertrrem(noteId, title) {
  const notification = new Notification("NOTEFY", {
    body: "Reminder for " + title,
    icon: "bell1.png",
  });
  var audio = new Audio("maharaj.mp3");
  audio.play();
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();

    let noteInfo = {
      title,
      description,
      date: `${month} ${day}, ${year}  ${hours}:${minutes}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});

//notification api
function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    // const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(
          "Notifications Enabled Successfully"
        );
        // …
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

notifyMe();
// function searchnotes() {
//   const notessearch = JSON.parse(localStorage.getItem("notes") || "[]");

//   let search = document.getElementsByClass('searchbar').value;
//   var length = notessearch.length;
//   console.log(length);
//   // let noteCards = document.getElementsByClassName('notes');
//   Array.from(notessearch).forEach(function (element) {
//     let cardTxt = element.getElementsByClass("p")[0].innerText;
//     let cardTxt1 = element.getElementsByClass("span")[0].innerText;
//     if (cardTxt.includes(search) || cardTxt1.includes(search)) {
//       element.style.display = "block";
//     }
//     else {
//       element.style.display = "none";
//     }
//   })
// }

function searchNotes() {
  const notessearch = JSON.parse(localStorage.getItem("notes") || "[]");
  var search = document.getElementById("searchQuery").value;
  console.log(search);

  var arrlength = notessearch.length;
  var i;
  const matchednotes = [];
  for (i = 0; i < arrlength; i++) {
    // to search in notes

    var cardTxt = notessearch[i].title;
    var cardTxt1 = notessearch[i].description;
    if (cardTxt.includes(search) || cardTxt1.includes(search)) {
      console.log("matched");
      matchednotes.push(notessearch[i]);
    }
  }
  var j = matchednotes.length;
  for (var k = 0; k < j; k++) {
    console.log(matchednotes[k]);

    let mnotes = `<li class="note">
                        <div class="details">
                            <p>${matchednotes[k].title}</p>
                            
                            <span>${matchednotes[k].description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${matchednotes[k].date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                
                            </div>
                        </div>
                    </li>`;
    
    addBox.insertAdjacentHTML("afterend", mnotes);
  }

  // showing matched notes
  

}
searchnotes();
