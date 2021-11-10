//registering  service worker
    
// if ( "serviceWorker" in navigator) {
//     navigator.serviceWorker.register("../../sw.js")
//         .then(reg => {
//             console.log("Register successful, Scope is", reg.scope)
//         }).catch(err => {
//             console.log("Register unsuccessful with:", err)
//         })
// } else {
//     console.log("service worker not in navigator")
// }

// getting texts making html and adding it to dom
fetch("../text/text.json")
.then(response => response.json())
.then(json => {
    const htmlList = document.createElement("div")
    htmlList.id = "list"
    json.map(info => {
        let newRow = document.createElement("div")
        newRow = addElement(info.id, "id", newRow)
        newRow.onclick = () => goto(info.id)
        info.id % 2 == 0 ? newRow.className="row even_row" : newRow.className="row odd_row"
        newRow = addElement(num_spaces  (info.text), "blanks",newRow )
        newRow = addElement(info.source, "source",newRow )
        newRow = addElement(info.time, "time", newRow)
        htmlList.appendChild(newRow)
    })
    document.getElementById("container").appendChild(htmlList)
})
.catch(err => {
    console.log("failed to fetch texts from text.json, error:", err)
})

// appends a span to given the element 
// used to add element to list like title, source time etc
function addElement(child, clsName, node) {
    const newEle = document.createElement("span")
    newEle.className = clsName
    newEle.innerHTML = child
    node.appendChild(newEle)
    return node
}

const num_spaces = (text) => text.split("{").length -1

// used by the html to direct to the text page
function goto(id) {
    window.location.href = `/pages/text/text.html#${id}`
}