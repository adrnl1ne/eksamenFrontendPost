function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function showPage(linkID) {
    resetPages();
    console.log(linkID)
    disableAllActiveClass();
    //$('#' + linkID).addClass("active");
    document.getElementById(linkID).classList.add("active");
    let pageID = linkID.split(":");
    console.log(pageID)
    $('#' + pageID[0]).show();
    console.log(pageID)
}

function disableAllActiveClass() {
    $('.nav-link').removeClass("active");
}

function resetPages() {
    $('.content-page').hide();
}




function confirmationButtonChange() {
    $('.confirmation-button').hide();
    $('.confirmation-button').show(2000, function() {
        // Animation completed, wait for 2 seconds before reloading
        setTimeout(function() {
            location.reload(); // Refresh the page
        }, 100);
    });
}
