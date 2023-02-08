let Mockaroo = require("mockaroo");
let fs = require("fs");
// var client = new Mockaroo.Client({
//   apiKey: "504f0a90", // your api key here
// });

// const childs = client
//   .generate({
//     count: 10,
//     fields: [
//       {
//         name: "firstName",
//         type: "First Name",
//       },
//       {
//         name: "lastName",
//         type: "Last Name",
//       },
//       {
//         name: "age",
//         type: "Number",
//       },
//       {
//         name: "skills[1-3]",
//         type: "Custom List",
//         values: ['run', 'jump', 'swim', 'dance'],
//       },
//       {
//         name: "gender",
//         type: "Custom List",
//         values: ['male', 'female'],
//       },
//       {
//         name: "married",
//         type: "Boolean",
//       },
//     ],
//   })
//   .then(async function (records) {
//     for (let item of records) {
//         if(item.married){
//             const childs = await client.generate({
//                 count: 3,
//                 fields: [
//                     {
//                     name: "firstName",
//                     type: "First Name",
//                     },
//                     {
//                     name: "lastName",
//                     type: "Last Name",
//                     },
//                     {
//                     name: "age",
//                     type: "Number",
//                     },
//                     {
//                     name: "skills[1-3]",
//                     type: "Custom List",
//                     values: ['run', 'jump', 'swim', 'dance'],
//                     },
//                     {
//                     name: "gender",
//                     type: "Custom List",
//                     values: ['male', 'female'],
//                     },
//                     {
//                     name: "married",
//                     type: "Boolean",
//                     },
//                 ],
//             });
//             item.children = childs
//         }   
//     }
//     fs.writeFileSync("./result.json", JSON.stringify(records));
// });


let res = JSON.parse(fs.readFileSync("./result.json", "utf-8"))
// console.log(res)

// Done
// filter by age under 30 and has the skills 'run' and 'swim'.
function filterDataByAgeAndSkills(res){
    let arrFiltered = []
    res.forEach(item => {
        if(item.age<30 && item.skills.some(i=>i==="run") && item.skills.some(i=>i==="swim")){
            arrFiltered.push(element)
        }
    });
    return arrFiltered
}

// Done
// filter by children who can swim or dance, and sort by gender and age.
let filterChildsAndSortData = res.filter(item=>{
    return item.children
}).map((item)=>{
    return item.children.sort((a, b)=>{
        if(a.age > b.age) return 1
        else if (a.age < b.age) return -1
        return 0
    }).filter((item)=>{
        return item.skills.some(i=>i==="dance") || item.skills.some(i=>i==="swim")
    })
})
// console.log(filterChildsAndSortData)

// Not perfect
// get an array of population, which contains all the people (adults and children) in the array.
// let flatData = (arr) => {
//     return Array.isArray(arr) ? [].concat(...arr.map(flatData)) : arr;
// }

// Done
// get an array of population, which contains all the people (adults and children) in the array.
let flatData2 = (arr) => {
    let flattedArr = []
    arr.forEach((adult)=>{
        flattedArr.push(adult)
        if(adult.children !== undefined){
            adult.children.forEach((child)=>{
                flattedArr.push(child)
            })
        }
    })
    return flattedArr
}
// console.log(flatData2(res))


// Done
// filter by people who have daughters and are not married.
let daughtersNotMarried = (arr) =>{
    let newArr = []
    arr.forEach(parent =>{
        parent.children?.forEach(child =>{
            if(child.gender === "female" && child.married === false) newArr.push(parent)
        })
    })
    return newArr
}
// console.log(daughtersNotMarried(res))


// Done
// filter by married people who can jump.
let marriedPeopleCanJump = (arr) =>{
    let flattedObj = flatData2(arr)
    let newObj = flattedObj.filter(item =>{
        return (item.married === true && item.skills.some(ele => ele === "jump"))
    })
    return newObj
}
// console.log(marriedPeopleCanJump(res))

// Done
// filter by people who have last name that starts with 'j' or later in the alphabet, and have married children.
function startsWith_J_AndHaveChildMarried(arr){
    let adultsArr = []

    arr.forEach((parent)=>{
        if(parent["lastName"].startsWith('J') && parent.children !== undefined){
            parent.children.some((child)=>{
                if(child.married === true) return adultsArr.push(parent)
            })
        }
    })
    return adultsArr
}
// console.log(startsWith_J_AndHaveChildMarried(res))


// Done
// change the collection so that the name of each person is: name: {first: 'string', last: 'string'}
// instead of firstName and lastName
let changeKeys = (arr) =>{
    arr.forEach(parent =>{
        parent.name = {}
        parent.name.first = parent["firstName"]
        delete parent["firstName"]
        parent.name.last = parent["lastName"]
        delete parent["lastName"]

        if(parent.children !== undefined){
            parent.children.forEach(child =>{
                child.name = {}
                child.name.first = child["firstName"]
                delete child["firstName"]
                child.name.last = child["lastName"]
                delete child["lastName"]
            })
        }
    })
    return arr
}
// console.log(changeKeys(res))

// Done
// get an array of all children
let getAllChildren = (arr) => {
    let childArr = []
    arr.forEach((adult)=>{
        if(adult.children !== undefined){
            adult.children.forEach((child)=>{
                childArr.push(child)
            })
        }
    })
    return childArr
}
// console.log(getAllChildren(res))