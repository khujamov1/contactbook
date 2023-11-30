const elContactForm = document.querySelector(".js-contact-form");
const elContactName = elContactForm.querySelector(".js-contact-name");
const elContactJob = elContactForm.querySelector(".js-contact-job");
const elContactNumber = elContactForm.querySelector(".js-contact-number");
const elContactTemplate = document.querySelector(".js-contact-template").content;
const contactList = document.querySelector(".js-contact-list");

const resultArr = [];
const contactFragment = new DocumentFragment;

function renderContactBook() {
    contactList.innerHTML = "";
    resultArr.forEach((contact, index) => {
        contactList.innerHTML = "";
        const contactTemplatorClone = elContactTemplate.cloneNode(true);
        contactTemplatorClone.querySelector(".contact-user").textContent = contact.name;
        contactTemplatorClone.querySelector(".contact-job").textContent = contact.job;
        contactTemplatorClone.querySelector(".contact-number").textContent = contact.number;
        contactTemplatorClone.querySelector(".contact-delete-btn").textContent = "Delete";
        contactTemplatorClone.querySelector(".contact-delete-btn").dataset.contactId = index;
        
        contactFragment.appendChild(contactTemplatorClone);
    })
    contactList.appendChild(contactFragment);
}

function addObj(userName, userJob, userNumber) {
    const numbers = [];
    resultArr.forEach(item => {
        numbers.push(item.number)
    })
    if(!numbers.includes(userNumber)) {
        resultArr.push({
            name: userName,
            job: userJob,
            number: userNumber
        })
    }else {
        alert("This number has been declared before")
    }
}


elContactForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const contactNameVal = elContactName.value.trim();
    const contactJobVal = elContactJob.value.trim();
    const contactNumberVal = elContactNumber.value.trim();
    addObj(contactNameVal, contactJobVal, contactNumberVal)
    renderContactBook();
    elContactForm.reset();
    
})

contactList.addEventListener("click", function(evt) {
    const deleteId = Number(evt.target.dataset.contactId);
    if (evt.target.matches(".contact-delete-btn")) {
        resultArr.splice(deleteId, 1)
    }
    renderContactBook();
})