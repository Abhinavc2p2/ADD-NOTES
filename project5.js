const addbox = document.querySelector(".add-box");
const popupbox = document.querySelector(".popupbox");
const popuptitle = popupbox.querySelector("header p");
const closeicon = popupbox.querySelector("header i");
const tittletag = popupbox.querySelector("input");
const disctag = popupbox.querySelector("textarea");
const addnote = popupbox.querySelector("button");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isupdate = false,
    updateId;

addbox.addEventListener("click", () => {
    popupbox.classList.add("show");
});


closeicon.addEventListener("click", () => {
    isupdate = false;
    popupbox.classList.remove("show");
    tittletag.value = "";
    disctag.value = "";
    addnote.innerText = "update Note"
    popuptitle.innerText = "add new Note"
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((notes, index) => {
        let liTag = `   <li class="note">
       <div class="details">
           <p>${notes.title}</p>
           <span>${notes.description}</span>
       </div>
       <div class="bottom-content">
           <span>${notes.date}</span>
           <div class="settings">
               <i  onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
               <ul class="menu">
                   <li><i  onclick="updateNote(${index} , '${notes.title}','${notes.description}')" class="uil uil-pen"> edit</i></li>
                   <li><i  onclick="deletenote((${index}))" class="uil uil-trash">delete</i></li>
               </ul>
           </div>
       </div>
   </li>`
        addbox.insertAdjacentHTML("afterend", liTag);
    });

}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click",
        e => {
            if (e.target.tagName != "I" || e.target != elem) {
                elem.parentElement.classList.remove("show")
            }
        })
}

function deletenote(noteId) {
    let confirmDel = confirm("Are you sure want to delete this note")
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isupdate = true;
    updateId = noteId;
    addbox.click();
    tittletag.value = title;
    disctag.value = desc;
    addnote.innerText = "update Note"
    popuptitle.innerText = "update a Note"
    console.log(noteId, title, desc);
}





addnote.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = tittletag.value,
        noteDesc = disctag.value;
    if (noteTitle || noteDesc) {
        let dateobj = new Date()
        month = dateobj.getMonth(),
            day = dateobj.getDate(),
            year = dateobj.getFullYear();
        console.log(month, day, year);

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${day} ${month},${year}`

        }
        if (!isupdate) {
            notes.push(noteInfo);

        } else {
            isupdate = false;
            notes[updateId] = noteInfo;
        }

        // notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        closeicon.click();
        showNotes();
    }
});