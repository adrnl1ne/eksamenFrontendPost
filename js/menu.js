function toggleSidebar() {
    let sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function showPage(linkID) {
    resetPages();
    console.log(linkID)
    disableAllActiveClass();

    document.getElementById(linkID).classList.add("active");
    let pageID = linkID.split(":");
    console.log(pageID)
    document.querySelector('#' + pageID[0]).style.display = "block";
    console.log(pageID)
}

function disableAllActiveClass() {
    document.querySelector('.nav-link').classList.remove("active");
}

function resetPages() {
    document.querySelector('.content-page').style.display = "none";
}
