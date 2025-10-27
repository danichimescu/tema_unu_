const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = "./serverfolderdata";

app.use(cors());
app.use(express.json());

if(!fs.existsSync(folderPath)){
  fs.mkdirSync(folderPath);
}

app.post("/createUser", (req, res) => {
  const content = req.body.content;

        // const newUser = {
        //     name: userData.name,
        //     firstName: userData.firstName,
        //     userName: userData.userName,
        //     email: userData.email,
        //     password: userData.password,
        //     phone: userData.phone,
        //     id: crypto.randomUUID().slice(0, 8)
        // }
// console.log(content.name, content.firstName, content.userName, content.email, content.password, content.phone, content.id);
  if (!content || !content.name || !content.firstName || !content.userName || !content.email || !content.password || !content.phone || !content.id) {
    return res.status(400).json({ message: "Error: Missing required fields." , status: "error"});
  }

  const fileName = `users.txt`;
  const filePath = path.join(folderPath, fileName);

  let users = [];
  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, 'utf-8');
    try {
      users = existingData.trim() === "" ? [] : JSON.parse(existingData);
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (err) {
      return res.status(500).json({ message: "Error reading existing users.", status: "error"});
    }
  }

  const newUser = {
    name: content.name,
    firstName: content.firstName,
    userName: content.userName,
    phone: content.phone,
    email: content.email,
    password: content.password,
    id: content.id    // admin: content.admin,

  };


// console.log('Name',content.name, 'First Name',content.firstName, 'User Name',content.userName, 'Email',content.email, 'Password',content.password, 'ID',content.id);

  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  const userFolderPath = path.join(folderPath, newUser.userName);
  fs.mkdirSync(userFolderPath);

  res.json({ message: `User created successfully!`, status: "success" });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // console.log('Login attempt for:',username,'and pass:',password);

  const filePath = path.join(folderPath, "users.txt");

  console.log('File path:', filePath);

  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);

  const foundUser = users.find(u => u.userName === username && u.password === password);

  if (!foundUser) {
    return res.status(401).json({ success: false, message: "Username sau parola incorecta!" });
  }

  const userFolder = path.join(folderPath, username);
  // const portfolioFilePath = path.join(userFolder, 'portfolio.txt');

    res.json({
    success: true,
    message: "Logare reusita!!",
    user: foundUser
  });
  
  // if (!fs.existsSync(userFolder)) {
  //   fs.mkdirSync(userFolder);
  // }

  // let portfolio = {};

  // //verificam daca userul are sau nu portfoliu
  // if (fs.existsSync(portfolioFilePath)) {
  //   const portfolioData = fs.readFileSync(portfolioFilePath, 'utf8');
  //   portfolio = JSON.parse(portfolioData);
  // } else {
  //   portfolio = {
  //     username: username,
  //     properties: []
  //   };
  //   fs.writeFileSync(portfolioFilePath, JSON.stringify(portfolio, null, 2));
  // }

  // res.json({
  //   success: true,
  //   message: "Logare reusita!",
  //   user: foundUser,
  //   portfolio
  // });
});

app.get("/loadUsers", (req, res) => {
  const filePath = path.join(folderPath, "users.txt");

  const data = fs.readFileSync(filePath, "utf-8");

  let users = [];

  users = JSON.parse(data);

  res.json({success: true, message: "Success!", users});

})


app.listen(PORT, () => console.log(`My server running on port ${PORT}`));


// app.get("/loadPortfolio/:username", (req, res) => {
//   const username = req.params.username;
//   const filePath = path.join(folderPath, username, 'portfolio.txt');

//   if (!fs.existsSync(filePath)) {
//     const initialData = {
//       username: username,
//       properties: []
//     };

//     fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
//     return res.status(201).json({ message: 'portfolio.txt created', portfolio: initialData });
//   }

//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const portfolio = JSON.parse(data);
//     res.json({ portfolio });
//   } catch (error) {
//     res.status(500).json({ message: 'Error reading or parsing portfolio file.' });
//   }
// });

// app.post("/createProperty/:username", (req, res) => {
//   const username = req.params.username;
//   const content = req.body.content;
//   const filePath = path.join(folderPath, username, "portfolio.txt");

//   if (!content || !content.name || !content.address || !content.type || !content.priority) {
//     return res.status(400).json({ message: "Error: Missing required fields." , status: "error"});
//   }

//   let portfolio = { username, properties: [] };

//   if (fs.existsSync(filePath)) {
//     const existingData = fs.readFileSync(filePath, 'utf-8');
//     try {
//       portfolio = JSON.parse(existingData);
//       if (!portfolio.properties || !Array.isArray(portfolio.properties)) {
//         portfolio.properties = [];
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error reading existing portfolio." });
//     }
//   }

//   const newProperty = {
//     name: content.name,
//     address: content.address,
//     type: content.type,
//     priority: content.priority
//   };

//   portfolio.properties.push(newProperty);

//   fs.writeFileSync(filePath, JSON.stringify(portfolio, null, 2));

//   const folderName = newProperty.name.split(" ")[0];
//   const propertyFolderPath = path.join(folderPath, username, folderName);
//   if (!fs.existsSync(propertyFolderPath)) {
//     fs.mkdirSync(propertyFolderPath);
//   }

//   res.json({ message: `Property created successfully!`, status: "success" });
// });

// app.post("/createRequest/:username/:name", (req, res) => {
//   const username = req.params.username;
//   const name = req.params.name.split(" ")[0];
//   const content = req.body.content;
//   const filePath = path.join(folderPath, username, name, "requests.txt");

//   if (!content || !content.name || !content.address || !content.description || !content.priority || !content.status) {
//     return res.status(400).json({ message: "Error: Missing required fields.", status: 'error'});
//   }

//   let requests = [];

//   if (fs.existsSync(filePath)) {
//     const existingData = fs.readFileSync(filePath, 'utf-8');
//     try {
//       requests = JSON.parse(existingData);
//       if (!requests|| !Array.isArray(requests)) {
//         requests = [];
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error reading existing requests." });
//     }
//   }

//   const newRequest = {
//     subject: content.subject,
//     name: content.name,
//     address: content.address,
//     description: content.description,
//     priority: content.priority,
//     status: content.status
//   };

//   newRequest.id = crypto.randomUUID().slice(0, 8);
//   requests.push(newRequest);

//   fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

//   res.json({ message: `Request created successfully!`, status: "success" });
// });

// app.put("/editRequest/:username/:name", (req, res) => {
//   const username = req.params.username;
//   const name = req.params.name.split(" ")[0];
//   const content = req.body.content;
//   const requestId = content.id;
//   const filePath = path.join(folderPath, username, name, "requests.txt");

//   if (!content || !content.subject || !content.description || !content.priority || !content.status) {
//     return res.status(400).json({ message: "Error: Missing required fields.", status: "error" });
//   }

//   let requests = [];

//   if (fs.existsSync(filePath)) {
//     const existingData = fs.readFileSync(filePath, 'utf-8');
//     try {
//       requests = JSON.parse(existingData);
//       if (!requests|| !Array.isArray(requests)) {
//         requests = [];
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error reading existing requests." });
//     }
//   }

//   const foundRequest = requests.find(u => u.id === requestId);

//   if (foundRequest) {
//   foundRequest.subject = content.subject;
//   foundRequest.description = content.description;
//   foundRequest.priority = content.priority;
//   foundRequest.status = content.status;
// } else {
//   return res.status(404).json({ message: "Request not found." });
// }


//   fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

//   res.json({ message: `Request updated successfully!`,status: "success"  });
// });

// app.delete("/deleteTask/:username/:name", (req, res) => {
//   const username = req.params.username;
//   const name = req.params.name.split(" ")[0];
//   const id = req.body.content;
//   const filePath = path.join(folderPath, username, name, "requests.txt");

//   let requests = [];

//   if (fs.existsSync(filePath)) {
//     const existingData = fs.readFileSync(filePath, 'utf-8');
//     try {
//       requests = JSON.parse(existingData);
//       if (!requests|| !Array.isArray(requests)) {
//         requests = [];
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error reading existing requests."});
//     }
//   }

//   requests = requests.filter(u => u.id !== id);


//   fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

//   res.json({ message: `Request deleted successfully!`, status:"success"  });
// });

// app.put("/solveTask/:username/:name", (req, res) => {
//   const username = req.params.username;
//   const name = req.params.name.split(" ")[0];
//   const id = req.body.content;
//   const filePath = path.join(folderPath, username, name, "requests.txt");

//   let requests = [];

//   if (fs.existsSync(filePath)) {
//     const existingData = fs.readFileSync(filePath, 'utf-8');
//     try {
//       requests = JSON.parse(existingData);
//       if (!requests|| !Array.isArray(requests)) {
//         requests = [];
//       }
//     } catch (err) {
//       return res.status(500).json({ message: "Error reading existing requests." });
//     }
//   }

//   const foundRequest = requests.find(u => u.id === id);
//   if(foundRequest.status === 'solved'){
//     foundRequest.status = 'unsolved'
//   } else{
//     foundRequest.status = 'solved'
//   }


//   fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

//   res.json({ message: `Request checked successfully!` });
// });

// app.get("/loadRequests/:username/:property", (req, res) => {
//   const username = req.params.username;
//   const property = req.params.property.split(" ")[0];
//   const filePath = path.join(folderPath, username,property ,'requests.txt');

//   if (!fs.existsSync(filePath)) {
//     const initialData = [];

//     fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
//     return res.status(201).json({ message: 'requests.txt created', requests: initialData });
//   }

//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     const requests = JSON.parse(data);
//     res.json({ requests });
//   } catch (error) {
//     res.status(500).json({ message: 'Error reading or parsing requests file.' });
//   }
// });




