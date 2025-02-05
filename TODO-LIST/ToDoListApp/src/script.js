var _a, _b;
var add_note = document.querySelector(".new_note_content");
var theme = document.querySelector("#themes");
var input_value = document.querySelector(".note_input");
var add_notes = document.querySelector(".apply_btn");
var new_container = document.querySelector(".notes_container");
var modal = document.querySelector(".content");
var notes = [];
var search_input = document.querySelector(".search_note");
var searchQuery = '';
search_input === null || search_input === void 0 ? void 0 : search_input.addEventListener('input', function (e) {
    var target = e.target;
    searchQuery = target.value.toLowerCase();
    displayNotes();
});
var remove_btn = (_a = document.querySelector(".cancel_btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    remove_modal();
});
var curr = theme === null || theme === void 0 ? void 0 : theme.getAttribute('name');
var saved_notes = localStorage.getItem('notes');
console.log(saved_notes);
function initializeNotes() {
    if (saved_notes && saved_notes !== '[]') {
        notes.length = 0;
        notes.push.apply(notes, JSON.parse(saved_notes));
        displayNotes();
    }
    else {
        empthyCover();
    }
}
initializeNotes();
function empthyCover() {
    if (new_container) {
        new_container.innerHTML = '';
        var newNote = document.createElement("div");
        var img = document.createElement("img");
        img.src = "../image/image.jpeg";
        var div = document.createElement("h2");
        if (notes.length === 0) {
            div.innerHTML = "Empty....";
        }
        else {
            switch (userOption) {
                case 'active':
                    div.innerHTML = "No active tasks";
                    break;
                case 'completed':
                    div.innerHTML = "No completed tasks";
                    break;
                default:
                    div.innerHTML = "Empty....";
            }
        }
        if (curr === "light") {
            div.style.color = "black";
        }
        else {
            div.style.color = "white";
        }
        newNote.appendChild(img);
        newNote.appendChild(div);
        new_container.appendChild(newNote);
    }
}
function remove_modal() {
    if (add_note) {
        add_note.style.display = "none";
        if (input_value) {
            input_value.value = "";
        }
    }
}
(_b = document.querySelector(".add_btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    if (add_note) {
        add_note.style.display = "block";
    }
});
window.addEventListener("click", outmodal);
function outmodal(e) {
    var _a;
    console.log(e.target);
    if ((add_note === null || add_note === void 0 ? void 0 : add_note.style.display) === "block" && e.target.getAttribute("class") == "new_note_content") {
        console.log('whatt');
        var targetElement = e.target;
        var outModal = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute("class");
        console.log(outModal);
        if (outModal !== "content") {
            remove_modal();
        }
    }
}
add_notes === null || add_notes === void 0 ? void 0 : add_notes.addEventListener("click", function () {
    if (input_value && input_value.value.trim() !== '') {
        notes.push({
            text: input_value.value,
            done: false
        });
        saveNotes();
        displayNotes();
        remove_modal();
    }
});
theme === null || theme === void 0 ? void 0 : theme.addEventListener("click", function () {
    if (theme) {
        var curr_1 = theme.getAttribute('name');
        if (curr_1 === "light") {
            document.documentElement.style.setProperty('--primary-color', '#252525');
            document.documentElement.style.setProperty('--text-color', 'white');
            theme.setAttribute('name', "dark");
            theme.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z\" />\n            </svg>";
        }
        else {
            document.documentElement.style.setProperty('--primary-color', 'white');
            document.documentElement.style.setProperty('--text-color', '#252525');
            theme.setAttribute('name', "light");
            theme.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z\" />\n            </svg>";
        }
    }
});
function displayNotes() {
    if (new_container && notes.length > 0) {
        new_container.innerHTML = '';
        // Filter notes based on userOption
        var note = notes;
        console.log(userOption);
        if (userOption === 'Incomplete') {
            note = notes.filter(function (note) { return !note.done; });
        }
        else if (userOption === 'Complete') {
            note = notes.filter(function (note) { return note.done; });
        }
        if (searchQuery) {
            note = notes.filter(function (note) {
                return note.text.toLowerCase().includes(searchQuery);
            });
        }
        if (note.length === 0) {
            empthyCover();
            return;
        }
        console.log(note);
        note.forEach(function (note, index) {
            var newNote = document.createElement("div");
            newNote.className = "newNote";
            newNote.setAttribute('data-index', "".concat(index));
            newNote.innerHTML = "\n                <div class=\"notes\">\n                    <div>\n                        <input type=\"checkbox\" class=\"note-checkbox\" ".concat(note.done ? 'checked' : '', ">\n                        <label style=\"text-decoration: ").concat(note.done ? 'line-through' : 'none', "; color: ").concat(note.done ? "gray" : "black", "\"> ").concat(note.text, " </label>\n                    </div>\n                    <div class=\"note_buttons\">\n                        <button class=\"delete_btn\">\n                            <svg width=\"20\" height=\"20\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z\" stroke=\"#CDCDCD\"/>\n                                <path d=\"M14.625 3.75H3.375\" stroke=\"#CDCDCD\" stroke-linecap=\"round\"/>\n                                <path d=\"M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z\" stroke=\"#CDCDCD\"/>\n                                <path d=\"M10.5 9V12.75\" stroke=\"#CDCDCD\" stroke-linecap=\"round\"/>\n                                <path d=\"M7.5 9V12.75\" stroke=\"#CDCDCD\" stroke-linecap=\"round\"/>\n                            </svg>\n                        </button>\n                        <button class=\"edit_btn\">\n                            <svg width=\"17\" height=\"16\" viewBox=\"0 0 15 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736\" stroke=\"#CDCDCD\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            </svg>\n                        </button>\n                    </div>\n                </div>\n                <hr>");
            // Add event listeners to the new note
            var checkbox = newNote.querySelector('.note-checkbox');
            checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('change', function () {
                notes[index].done = checkbox.checked;
                saveNotes();
            });
            var deleteBtn = newNote.querySelector('.delete_btn');
            deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener('click', function () {
                notes.splice(index, 1);
                saveNotes();
                if (notes.length === 0) {
                    empthyCover();
                }
                else {
                    displayNotes();
                }
            });
            var editBtn = newNote.querySelector('.edit_btn');
            editBtn === null || editBtn === void 0 ? void 0 : editBtn.addEventListener('click', function () {
                var currentText = notes[index].text;
                var newText = prompt('Edit note:', currentText);
                if (newText && newText.trim() !== '') {
                    notes[index].text = newText;
                    saveNotes();
                    displayNotes();
                }
            });
            new_container.appendChild(newNote);
        });
    }
    else if (new_container && notes.length === 0) {
        empthyCover();
    }
}
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}
var userOption = 'all';
var type = document.querySelector("select");
type === null || type === void 0 ? void 0 : type.addEventListener('change', function (e) {
    var target = e.target;
    userOption = target.value;
    displayNotes();
});
// workes
// Initial load
initializeNotes();
