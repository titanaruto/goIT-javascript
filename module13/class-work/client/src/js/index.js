import model from "./model";
import {updatePost} from "./services/api";

const refs = {
    addItemBtn: document.querySelector('button[data-action="add"]')
};
model.get().then(posts => {
    console.log("Reading all list items!");
    console.log(posts);
});
refs.addItemBtn.addEventListener('click', () => {
    model.add({
        title: "title2",
        body: "body2",
        createdAt: new Date().toLocaleTimeString()
    })
        .then(addedItem => {
        console.log(addedItem);
    }).catch(error => {
        console.log(error);
    });
});

model.update(8, {title: "SUPER TITLE"}).then(updatedItem => {
    console.log(`Ready to update item with id: ${updatedItem.id}`);
    console.log(updatePost);
});
// model.delete(6).then(id => {
//     console.log(`removing list item with ${id}`);
// }).catch(error => {
//     console.log(error);
// });