import React from "react";
import firebase from 'firebase/app';
import '@firebase/firestore';
const serviceAccount = require('./facecardServiceAccount.json');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: serviceAccount.private_key,
    authDomain: serviceAccount.authDomain,
    projectId: serviceAccount.project_id,
});

var db = firebase.firestore();

//   db.collection("characters").where('houseName','==','Stark').get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch(function(error) {
//     console.log("Error getting documents: ", error);
//   });

export default class Character {
    constructor(id) {
        this.id = id;
        this.characterName;
        this.siblings = [];
        this.parents = [];
        this.children = [];
    };
    getId = () => this.id;
    setId = (id) => { this.id = id; }

    updNeighbours = (componnent) => {
        if (this.id) {
            // call firestore api to get L/R/U/D ids
            // var id = this.id;
            const docRef = db.collection("characters").doc(this.id.toString());
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const characterInfo = doc.data();
                    if ("characterName" in characterInfo) {
                        this.characterName = characterInfo.characterName;
                    };
                    if ("siblings" in characterInfo) {
                        this.siblings = characterInfo.siblings;
                    };
                    if ("parents" in characterInfo) {
                        this.parents = characterInfo.parents;
                    };
                    if ("parentOf" in characterInfo) {
                        this.children = characterInfo.parentOf;
                    };
                    componnent.setState({
                        slides: this.getSlides()
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    };

    formatItem = (content) => (<b>{content}</b>);

    getParentName = () => {
        const items = [];
        if (this.parents) {
            this.parents.forEach((parent) => {
                items.push(this.formatItem(parent));
            });
        } else {
            items.push(this.formatItem("Add Parent"));
        };
        return items;
    };

    getSiblingsName = () => {
        const items = [];
        if (this.siblings) {
            this.siblings.forEach((sibling) => {
                items.push(this.formatItem(sibling));
            });
        } else {
            items.push(this.formatItem("Add Sibling"));
        };

        this.characterName ? items.push(this.formatItem(this.characterName)) : items.push(this.formatItem("Not Found"));
        return items;
    };

    getChildrenName = () => {
        const items = [];
        if (this.children) {
            this.children.forEach((child) => {
                items.push(this.formatItem(child));
            })
        } else {
            items.push(this.formatItem("Add Child"));
        }
        return items;
    };

    getCurrentDisplayName = (x, y) => {
        if (x === 0) {
            return this.parents[y];
        };
        if (x === 1) {
            return this.siblings[y];
        };
        if (x === 2) {
            return this.children[y];
        };
    }

    getIdByName = (name) => {
        if(name){
            const docRef = db.collection("characters").where("characterName", "==", name).get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        return doc.id;
                    })
                });
        }
    }


    getSlides = () => {

        var parent
        //sibling array
        //first child
        return {
            rows: [
                {
                    id: 1,
                    items: this.getParentName()
                },
                {
                    id: 2,
                    items: this.getSiblingsName()
                },
                {
                    id: 3,
                    items: this.getChildrenName()
                },
            ]
        };

    }

}